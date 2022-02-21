import ora from "ora";
import prompts from "prompts";
import { config } from "dotenv";
import { to } from "await-to-js";
import path from "path"
import chalk from 'chalk';
import glob from 'glob'
import util from 'util'
import fs from 'fs'
import neatCsv from 'neat-csv';

config({
    path: './.env.local'
});

const aglob = util.promisify(glob)
const areadFile = util.promisify(fs.readFile)

const collectionTypes = ["Generic", "Feedback", "ProblemSubmission", "ProblemStart"]

;(async () => {
    let err, _spinner = {}, csvArr, _;
    [err, csvArr] = await to(findCSVs(_spinner));
    if (err) {
        _spinner.spinner.fail()
        console.debug("error log: ", err)
        console.log(`Failed to find CSVs in the ${chalk.bold('in')} directory`)
        return
    }

    const { csvSelections, collectionType } = await prompts([
        {
            type: 'autocompleteMultiselect',
            name: 'csvSelections',
            message: 'Which collection(s) to verify?',
            choices: csvArr.map(csv => ({ title: csv, value: csv }))
        },
        {
            type: "select",
            name: "collectionType",
            message: "What type of collection is this?",
            choices: collectionTypes.map(type => ({ title: type, value: type }))
        }
    ]);

    if (!csvSelections) {
        console.log("Exiting program.")
        return
    }

    if (!collectionType) {
        console.log("Exiting program.")
        return
    }

    [err, _] = await to(verifyCSVs(_spinner, csvSelections, collectionType))
    if (err) {
        _spinner.spinner.fail()
        console.debug("error log: ", err)
        console.log(`Failed to verify CSVs`)
        return
    }

    ora("Done verifying collection(s).")
})()


async function findCSVs(_spinner) {
    const spinner = ora(`Finding CSVs in the ${chalk.bold('in')} directory`).start()
    _spinner.spinner = spinner

    const csvArr = await aglob("in/**/*.csv")

    spinner.succeed()
    return csvArr
}

async function verifyCSVs(_spinner, csvSelections, collectionType) {
    const spinner = ora(`Verifying CSVs...`).succeed()
    _spinner.spinner = spinner

    await Promise.all(csvSelections.map(async csv => {
        const _csv = await areadFile(path.join(csv))
        const _objects = await neatCsv(_csv)
        const objects = _objects.map(obj => Object.fromEntries(Object.entries(obj).map(parseEntry)))

        objects.forEach(_object => {
            const object = new ObjectValidator(_object)
            object.assertType("semester", "string")
            object.assertType("siteVersion", "string")
            object.assertType("treatment", "string", "number")
            object.assertType("oats_user_id", "string")
            object.assertType("time_stamp", "number")

            object.assertPredicate("course_id", val => val === "n/a" || val?.toString().length === 40)
            object.assertOptionalNotNull("course_code")
            object.assertOptionalNotNull("course_name")
            object.assertOptionalNotNull("canvas_user_id")

            object.assertType("timeStamp", "undefined")
            object.assertType("canvasStudentID", "undefined")
            // if row does not have oats_user_id (legacy: studentID), salt + hash into oats_user_id
            object.assertType("full_name", "undefined")
            object.assertType("studentID", "undefined")

            switch (collectionType) {
                case "Feedback": {
                    object.assertType("feedback", "string")
                    object.assertPredicate("Content", val => val === "n/a" || (typeof val === "string" && val.length > 4))
                    object.assertType("problemFinished", "boolean")
                    object.assertType("problemID", "string")
                    object.assertType("status", "string")
                    object.assertPredicate("steps", val => Array.isArray(val))
                    object.assertPredicate("variables", val => val === Object(val))
                    break
                }
                case "ProblemSubmission": {

                    break
                }
                case "ProblemStart": {

                    break
                }
            }

            object.validate()
        })
    }))

    return true
}

const parseEntry = ([_key, val]) => {
    const [key, type] = _key.split("##")
    if(type === "boolean"){
        return [key, typeof val === "string" ? val === "true" : null]
    }
    if(type === "object"){
        return [key, parseJSON(val)]
    }
    if(type === "number"){
        return [key, isNaN(+val) ? null : +val]
    }

    return [key, val]
}

const parseJSON = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.debug("error parsing json: ", str, e)
        return str;
    }
};

class ObjectValidator {
    #assertions
    #trackedFields

    constructor(object) {
        this.object = object
        this.#assertions = []
        this.#trackedFields = []
    }

    _trackField = (field) => {
        if (!this.#trackedFields.includes(field)) {
            this.#trackedFields.push(field)
        }
    }

    assertPredicate = (field, predicate) => {
        this._trackField(field)
        const obj = this.object
        const val = obj[field]
        this.#assertions.push(() => {
            if (!predicate(val)) {
                console.log(`field ${chalk.bold(field)}'s value ${chalk.bold(val)} does not pass predicate: ${chalk.bold(predicate.toString())}`)
                return false
            }
            return true
        })
    }

    assertOptionalNotNull = (field) => {
        this._trackField(field)
        const obj = this.object
        const val = obj[field]
        this.#assertions.push(() => {
            if (val === null) {
                console.log(`field ${chalk.bold(field)} is null`)
            }
            return true
        })
    }

    assertType = (field, ...types) => {
        this._trackField(field)
        const obj = this.object
        const val = obj[field]
        this.#assertions.push(() => {
            if (!types.some(type => typeof val === type)) {
                console.log(`field ${chalk.bold(field)}'s value ${chalk.bold(val)} has type ${chalk.bold(typeof val)} which does not match type(s): ${chalk.bold(types.join(" "))}`)
                return false
            }
            return true
        })
    }

    validate = () => {
        const errored = this.#assertions.map(assertion => !assertion()).some(_ => _)

        const unknownFields = Object.keys(this.object).filter(key => !this.#trackedFields.includes(key))
        if (unknownFields.length > 0) {
            console.log(chalk.yellow(`Unknown fields: ${chalk.bold(unknownFields.join(", "))}`))
        }
        if (errored) {
            console.log(chalk.grey(JSON.stringify(this.object)))
        }

        if (errored || unknownFields) {
            console.log()
        }
    }
}