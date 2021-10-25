var hints = [{id: "gre12a-h1", type: "hint", dependencies: [], title: "Factor into Primes", text: "Factor each coefficient into primes and write the variables with exponents in expanded form. A prime number is a counting number greater than 1, whose only factors are 1 and itself. The first few prime numbers are: 2, 3, 5, 7, 11, 13, etc.", variabilization: {}}, {id: "gre12a-h2", type: "hint", dependencies: ["gre12a-h1"], title: "Factor First Expression", text: "$$\\left(21\\right) b^2=\\left(7\\right) \\left(3\\right) b b$$", variabilization: {}}, {id: "gre12a-h3", type: "hint", dependencies: ["gre12a-h2"], title: "Factor Second Expression", text: "$$\\left(14\\right) b=\\left(7\\right) \\left(2\\right) b$$", variabilization: {}}, {id: "gre12a-h4", type: "hint", dependencies: ["gre12a-h2", "gre12a-h3"], title: "Identify Common Factors in each Column", text: "$$\\left(21\\right) b^2=\\left(7\\right) \\left(3\\right) b b$$ $$\\left(14\\right) b=\\left(7\\right) \\left(2\\right) b$$ 7 and b are shared by both expressions.", variabilization: {}}, {id: "gre12a-h5", type: "hint", dependencies: ["gre12a-h4"], title: "Multiply Common Factors", text: "Bring down the 7 and b, and then multiply. $$GCF=\\left(7\\right) b$$", variabilization: {}}, {id: "gre12a-h6", type: "hint", dependencies: ["gre12a-h5"], title: "Multiply Common Factors", text: "$$GCF=\\left(7\\right) b$$", variabilization: {}}, ]; export {hints};