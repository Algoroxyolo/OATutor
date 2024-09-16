import os
import json

# Define the base directory for content pool
BASE_DIR = './content-pool'

# Define course details
course_name = 'Differentiation'
problems = [
    {
        "id": "diff1",
        "title": "Basic Differentiation",
        "body": "Differentiate the function f(x) = x^2 + 3x + 2.",
        "lesson": "2.1 Basic Differentiation",
        "courseName": course_name,
        "steps": [
            {
                "id": "diff1a",
                "stepAnswer": ["2x + 3"],
                "problemType": "TextBox",
                "stepTitle": "1. Derivative of f(x)",
                "stepBody": "Find the derivative of f(x) = x^2 + 3x + 2.",
                "answerType": "algebraic",
                "hints": [
                    {
                        "id": "diff1a-h1",
                        "title": "Power Rule",
                        "text": "Recall the power rule: if f(x) = x^n, then f'(x) = nx^(n-1).",
                        "type": "hint",
                        "dependencies": [],
                    },
                    {
                        "id": "diff1a-h2",
                        "title": "Derivative of Linear Term",
                        "text": "The derivative of 3x is 3.",
                        "type": "scaffold",
                        "dependencies": [0],
                    },
                    {
                        "id": "diff1a-h3",
                        "title": "Solution",
                        "text": "The derivative of f(x) = x^2 + 3x + 2 is f'(x) = 2x + 3.",
                        "type": "solution",
                        "dependencies": [1],
                    }
                ]
            }
        ]
    }
]

def create_folder(path):
    if not os.path.exists(path):
        os.makedirs(path)

def write_json_file(filepath, data):
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)

def create_problem_structure(problem):
    problem_folder = os.path.join(BASE_DIR, problem['id'])
    create_folder(problem_folder)
    
    # Create problem metadata file
    problem_metadata = {
        "id": problem["id"],
        "title": problem["title"],
        "body": problem["body"],
        "variabilization": {},
        "oer": "https://example.com",
        "lesson": problem["lesson"],
        "courseName": problem["courseName"]
    }
    write_json_file(os.path.join(problem_folder, f"{problem['id']}.json"), problem_metadata)
    
    # Create steps and hints
    steps_folder = os.path.join(problem_folder, 'steps')
    create_folder(steps_folder)
    
    for step in problem["steps"]:
        step_folder = os.path.join(steps_folder, step['id'])
        create_folder(step_folder)
        
        # Create step metadata file
        step_metadata = {
            "id": step["id"],
            "stepAnswer": step["stepAnswer"],
            "problemType": step["problemType"],
            "stepTitle": step["stepTitle"],
            "stepBody": step["stepBody"],
            "answerType": step["answerType"],
            "variabilization": {}
        }
        write_json_file(os.path.join(step_folder, f"{step['id']}.json"), step_metadata)
        
        # Create tutoring folder and hints
        tutoring_folder = os.path.join(step_folder, 'tutoring')
        create_folder(tutoring_folder)
        
        for i, hint in enumerate(step["hints"]):
            hint_file = os.path.join(tutoring_folder, f"{step['id']}DefaultPathway.json")
            write_json_file(hint_file, step["hints"])

# Create each problem structure
for problem in problems:
    create_problem_structure(problem)

# Example to update skillModel.json (assuming the file exists)
skill_model_path = './skillModel.json'
if os.path.exists(skill_model_path):
    with open(skill_model_path, 'r+') as f:
        skill_model = json.load(f)
        # Add skills related to differentiation (you can modify this as needed)
        skill_model['skills'].append({
            "id": "differentiation",
            "name": "Differentiation Skills"
        })
        f.seek(0)
        json.dump(skill_model, f, indent=4)
else:
    # Create skillModel.json if it doesn't exist
    skill_model = {
        "skills": [
            {
                "id": "differentiation",
                "name": "Differentiation Skills"
            }
        ]
    }
    write_json_file(skill_model_path, skill_model)

print("Files and directories created successfully for Differentiation course.")
