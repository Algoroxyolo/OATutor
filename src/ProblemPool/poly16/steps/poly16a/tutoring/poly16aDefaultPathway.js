var hints = [{id: "poly16a-h1", type: "hint", dependencies: [], title: "Subtracing Polynomials", text: "In this problem you are subtracting one expression from another, so use the distributive property to distribute the negative sign."}, {id: "poly16a-h2", type: "hint", dependencies: ["poly16a-h1"], title: "Group Like Terms", text: "Find all the $b^4$ terms and $\\frac{add}{subtract}$ the coefficients."}, {id: "poly16a-h3", type: "scaffold", problemType: "TextBox", answerType: "numeric", hintAnswer: ["11"], dependencies: ["poly16a-h2"], title: "Group Like Terms", text: "What is the coefficient that preceeds $b^4$?"}, {id: "poly16a-h4", type: "hint", dependencies: ["poly16a-h3"], title: "Group Like Terms", text: "Find all the $b^3$ terms and $\\frac{add}{subtract}$ the coefficients."}, {id: "poly16a-h5", type: "scaffold", problemType: "TextBox", answerType: "numeric", hintAnswer: ["-9"], dependencies: ["poly16a-h4"], title: "Group Like Terms", text: "What is the coefficient that preceeds $b^3$?"}, {id: "poly16a-h6", type: "hint", dependencies: ["poly16a-h5"], title: "Group Like Terms", text: "Find all the $b^2$ terms and $\\frac{add}{subtract}$ the coefficients."}, {id: "poly16a-h7", type: "scaffold", problemType: "TextBox", answerType: "numeric", hintAnswer: ["12"], dependencies: ["poly16a-h6"], title: "Group Like Terms", text: "What is the coefficient that preceeds $b^2$?"}, {id: "poly16a-h8", type: "hint", dependencies: ["poly16a-h7"], title: "Group Like Terms", text: "Find all the b terms and $\\frac{add}{subtract}$ the coefficients."}, {id: "poly16a-h9", type: "scaffold", problemType: "TextBox", answerType: "numeric", hintAnswer: ["-7"], dependencies: ["poly16a-h8"], title: "Group Like Terms", text: "What is the coefficient that preceeds b?"}, {id: "poly16a-h10", type: "hint", dependencies: ["poly16a-h9"], title: "Group Like Terms", text: "Find all the number terms and $\\frac{add}{subtract}$ them."}, {id: "poly16a-h11", type: "scaffold", problemType: "TextBox", answerType: "numeric", hintAnswer: ["8"], dependencies: ["poly16a-h10"], title: "Group Like Terms", text: "What is the number?"}, {id: "poly16a-h12", type: "hint", dependencies: ["poly16a-h11"], title: "Writing Expressions", text: "Write an expression with all of the combined and simplified terms."}, ]; export {hints};