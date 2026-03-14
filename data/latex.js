const LATEX_PROGRAMS = [
    {
        title: "1. Two Sections with Header and Footer",
        code: `//program1.tex
\\documentclass {article}
\\usepackage{authoraftertitle}
\\usepackage{fancyhdr}
\\fancyhead {}
\\fancyhead [L] {left header}
\\fancyhead[R]{right header \\quad \\thepage}
\\fancyfoot{}
\\fancypagestyle {plain} {
}
\\fancyhead {}
\\fancyhead[C]{Intent based Search Diversification}
\\fancyfoot{}
\\fancyfoot[C]{VKIT, Bangalore}
\\pagestyle{fancy}
\\title{Search Optimization Process}
\\begin{document}
\\maketitle
\\section{Context based Diversification}
The human era is evolved and dominated through the ultimate intention to know
about the Universe and its assets more and more. This in turn persuaded him to gather
the immense information of need in the form of theory, tools, intuitions, visuals, and
ultimately as the form of abstract objects.
\\section{ Conceptualization of the Search Queries}
Deciding the context of the search query based on its representation over a concept
network using fuzzy methods provides a better thrust to the overall search process.
The existing context based search diversification process emphasizes the importance
of the numerical representation of the query over a data repository. The search
operation can use these semantically meaningful segments as a confident segment in
the conceptual network.
\\end{document}`
    },
    {
        title: "2. Abstract / Summary",
        code: `//program2.tex
\\documentclass {article}
\\usepackage{ragged2e}
\\title{\\textbf{Abstract}}
\\vspace{-8ex}
\\date{}
\\begin{document}
\\maketitle
\\thispagestyle{empty}
\\justify {Whenever multi-sense or non-domain specificity
arises in a query it is difficult to deliver exact or approximate
results to users for that query in considerable time limit. Modern
search engines fetch enough similar results for a query over
a data tree or a corpus by applying query approximation
algorithms. The proposed approximate query answering model
called Query Answering with Pointed Graphs (QAPG) achieves
query approximation by evaluating the user concerned queries
on proper semantic paths on an Accessible Pointed Graph (APG)
relaxed with architectural clues.}
\\vspace{1mm}
\\justify {The proposed model formulates semantically
inferred path algebra for a query and performs the path mapping
with other set of path algebras of corresponding query keywords
or a closely matched fuzzy set of another corresponding query
keywords to find approximate queries. The concept of APG is
used for weaving the paths, subsumed with the given concerned
keyword set. Users are more concerned about their choice of
search context so each selected attribute of the query is weighted
according to the nature of data items either numerical or
categorical in type.}
\\vspace{1mm}
\\justify {The content similarity function is used to
associate the categorical values to weighted attributes to evaluate
overall content similarity. The overall similarity of the obtained paths is calculated
from the association of content similarity and twig level similarity. The approximation
function elegantly
combines structure with contents to answer approximate queries.
User preference on top-k answers are adjusted by an adjustment
coefficient. The approximation function can find out a range of
most relevant answers from a large number of XML data sources
by tuning the adjustment coefficient.}
\\justify {\\textbf{Keywords:} Path algebra, Twig, APG, Architectural clues, Content
similarity.}
\\end{document}`
    },
    {
        title: "3. VTU Title Page",
        code: `//program3.tex
\\documentclass[a4paper, 12pt]{report}
\\usepackage{graphicx}
\\usepackage{xcolor}
\\begin{document}
\\include {FrontPage-VTU}
\\end{document}

=======================================

//FrontPage-VTU.tex
\\thispagestyle{empty}
\\pagenumbering {roman}
\\setcounter{page}{1}
\\begin{center}
\\textbf{\\large Intent based Diversification of Query Keywords}
\\end{center}
\\vspace{18mm}
\\begin{center}
\\begin{small}
A Project Report\\\\
Submitted for the Award of the Degree\\\\
of\\\\
Bachelor of Engineering\\\\
in\\\\
Computer Science and Engineering\\\\
by\\\\
\\vspace{.5cm}
\\textbf{Komalavalli P}\\\\
IV SEM\\\\
\\vspace{.3cm}
Under the guidance of\\\\
\\vspace{.5cm}
\\textbf{Dr. Vidya A}\\\\
Professor, HoD\\\\
Vivekananda Institute of Technology\\\\
Visvesvaraya Technological University, Belgavi.\\\\
\\end{small}
\\vspace{10mm}
\\centerline {\\includegraphics[scale=.4]{vtu1}}
\\vspace{20mm}
Department of Computer Science and Engineering\\\\
Vivekananda Institute of Technology,\\\\
Visvesvaraya Technological University, Belgavi.\\\\
\\color{white}jg\\color{black}\\\\
April 2024\\\\
\\end{center}`
    },
    {
        title: "4. Certificate Page",
        code: `//program4.tex
\\documentclass[a4paper, 12pt] {report}
\\usepackage{graphicx}
\\usepackage{ragged2e}
\\usepackage{xcolor}
\\begin{document}
\\include {Certificate-VTU}
\\end{document}

=======================================

//Certificate-VTU.tex
\\thispagestyle{empty}
\\pagenumbering {roman}
\\setcounter {page}{1}
\\begin{center}
\\textbf{\\large Visvesvarya Technological University}\\newline
\\textbf{\\small JnanaSangama BELAGAVI - 590018}
\\newline
\\newline
\\centerline {\\includegraphics[scale=.4]{vtu1}}
\\newline
\\newline
\\textbf{\\small DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING}
\\newline
\\newline
\\textbf{\\large CERTIFICATE}
\\end{center}
\\vspace{5mm}
\\justify {This is to certify that Mr. Basvaraju K N bearing USN:1VKIT20CS008 is a
bonafide student of Bachelor of Engineering course of the Department of Computer
Science and Engineering, VTU, Belgavi, affiliated to Visvesvaray Technological
University, Belagavi. Project report on "Context-based Diversication of Search
Engines" is prepared by him under the guidance of Dr. Haneefa Shafi in partial
fulfillment of the requirements for the award of the degree of Bachelor of Engineering
of Visvesvaray Technological University, Belagavi, Karnataka.}
\\newline
\\newline
\\newline
\\newline
\\newline
\\hspace{16mm}
.\\hspace{16mm}.
Dr. Haneefa Shafi \\hspace{16mm} Dr. Sangeetha P \\hspace{14mm} Dr. Kuriyan M
A
\\newline
\\newline
Signature of Guide \\hspace{13mm} Signature of HoD \\hspace{11mm} Signature of
Principal
\\begin{center}
\\vspace{10mm}
\\textbf{\\small EXTERNAL EXAMINER}
\\end{center}
\\vspace{5mm}
Name of Examiners \\hspace {60mm} Signature with date
\\newline
\\newline
1.
\\newline
\\newline
2.`
    },
    {
        title: "5. Table with Proper Labels",
        code: `//program5.tex
\\documentclass {article}
\\usepackage[utf8] {inputenc}
\\begin{document}
\\begin{tabular}{ cc|cc|cc|}
\\hline
$SI.No$ & $USN$& $Student name$ &\\multicolumn {3}{c} {Marks}\\\\
\\cline {4-6}
& & & Subject1 & Subject2 &Subject3 \\\\ \\hline
1& 4XX22XX001&Namel &89 &60 &90 \\\\ \\hline
2& 4XX22XX002&Name2 &78 &45 &98 \\\\ \\hline
3& 4XX22XX003&Name3 &67 &55 &59 \\\\ \\hline
\\end{tabular}
\\end{document}`
    },
    {
        title: "6. Side-by-side Graphics using Subgraph",
        code: `//program6.tex
\\documentclass{standalone}
\\usepackage{tikz}
\\usetikzlibrary{graphs.standard}
\\begin{document}
\\begin{tikzpicture}
\\graph[nodes={circle,draw}, simple]
{
subgraph K_n [n=8,clockwise];
};
\\end{tikzpicture}
\\begin{tikzpicture}
\\graph[nodes={circle,draw}, simple]
{
subgraph K_n [n=8, clockwise] -> mid;
};
\\end{tikzpicture}
\\begin{tikzpicture}
\\graph[nodes={circle, draw}, simple]
{
subgraph K_n [n=8,clockwise];
8-1-3-1-4-1-5-1-2;
};
\\end{tikzpicture}
\\end{document}`
    },
    {
        title: "7. Mathematical Equations",
        code: `//program7.tex
\\documentclass[a4paper, 12pt] {report}
\\usepackage{esvect}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{ragged2e}
\\begin{document}
\\begin{equation*}
\\begin{split}
$x=\\frac{-b\\pm \\sqrt{b\\textsuperscript{2}-4ac}}{2a}$
\\end{split}
\\end{equation*}
\\begin{equation*}
\\begin{split}
=\\frac{-2 \\pm \\sqrt{2\\textsuperscript{2}-4*1*(-8)}}{2*1}
\\end{split}
\\end{equation*}
\\begin{equation*}
\\begin{split}
=\\frac{-2 \\pm \\sqrt{4+32}}{2}
\\end{split}
\\end{equation*}
\\begin{equation*}
\\begin{split}
\\partial
\\textsuperscript {$\\lambda$}\\textsubscript{$\\sigma$}A\\textsubscript {t}=\\sum
\\textsubscript{$\\pi$ in C\\textsubscript{t}} sgn(\\pi) \\partial
\\textsuperscript {$\\lambda$}\\textsubscript{$\\sigma$} \\partial
\\textsuperscript {$\\lambda$}\\textsubscript{$\\pi$}
\\end{split}
\\end{equation*}
\\begin{equation*}
\\begin{split}
=\\sum \\textsubscript{$\\tau$ in C\\textsubscript{$\\sigma$t}}
sgn(\\sigma\\textsuperscript{-1}\\tau\\sigma) \\partial
\\textsuperscript {$\\lambda$}\\textsubscript{$\\sigma$}\\partial
\\textsuperscript {$\\lambda$}\\textsubscript{$\\sigma$\\textsuperscript{-1}$\\tau$
$\\sigma$}
\\end{split}
\\end{equation*}
\\begin{equation*}
\\begin{split}
=A\\textsubscript{$\\sigma$t $\\partial$
\\textsuperscript {$\\lambda$}\\textsubscript{$\\sigma$}}
\\end{split}
\\end{equation*}
\\end{document}`
    },
    {
        title: "8. Theorems, Definitions, Corollaries, Lemmas",
        code: `//program8.tex
\\documentclass{article}
\\usepackage[english] {babel}
\\usepackage{ragged2e}
\\newtheorem {theorem} {Theorem}
\\newtheorem {corollary} {Corollary} [theorem]
\\newtheorem {lemma} [theorem] {Lemma}
\\newtheorem {definition} {Definition} [section]
\\begin{document}
\\section{Theorem}
\\begin{theorem} [Accessible pointed graph]
\\justify {Consider an XML database D and a twig query q with only ancestor,
descendant relationships in branching edges. The worst case I/O complexity is
decided by the number of holistic nodes in the path algebra. The above theorem
strongly supports the existence of accessible pointed graphs in a tree.}
\\end{theorem}
\\section{Corollary}
\\begin{corollary}
Corresponding corollary
\\end{corollary}
\\section{Lemma}
\\begin{lemma}
Corresponding Lemma
\\end{lemma}
\\section{Definition}
\\begin{definition}
Corresponding definition
\\end{definition}
\\end{document}`
    },
    {
        title: "9. Paragraphs with Citations",
        code: `//program9.tex
\\documentclass[a4paper, 12pt]{report}
\\thispagestyle{plain}
\\begin{document}
\\thispagestyle{empty}
\\pagenumbering {arabic}
\\setcounter {page}{1}
\\chapter {Search Process on Fly}
\\section{Context based Diversification}
The human era is evolved and dominated through the ultimate intention to know
about the Universe and its assets more and more. This in turn persuaded him to gather
the immense information of need in the form of theory, tools, intuitions, visuals, and
ultimately as the form of abstract objects \\cite{ffy}, \\cite{xyshw}, \\cite{tbhs},
\\cite{dpgk}, \\cite{jaip}, \\cite{pdkgvym}.
Deciding the context of the search query based on its representation over a concept
network using fuzzy methods provides a better thrust to the overall search process.
The existing context based search diversification process emphasizes the importance
of the numerical representation of the query over a data repository \\cite{fpsu},
\\cite{sysxh}, \\cite{zwjfw}, \\cite{dwhh}. The search operation can use these
semantically meaningful segments as a confident segment in the conceptual network.
\\bibliographystyle {IEEEtran}
\\bibliography {prg9}
\\end{document}

=======================================

//prg9.bib (Sample partial bib file)
@article {ffy,
author={Liu, Fei and Liu, Feifan and Liu, Yang},
title={{A Supervised Framework for Keyword Extraction from Meeting Transcripts}},
journal={IEEE Transactions on Audio, Speech, and Language Processing},
publisher={IEEE},
volume ={19},
number={3},
pages={538-548},
year={2011}
}`
    },
    {
        title: "10. Tree Diagram (TikZ)",
        code: `//program10.tex
\\documentclass{standalone}
\\usepackage{tikz}
\\usetikzlibrary{graphs.standard}
\\begin{document}
\\begin{tikzpicture}
[level distance=10mm,
every node/.style={fill=blue!40, circle, inner sep=1pt},
level 1/.style={sibling distance=20mm,nodes={fill=blue!40}},
level 2/.style={sibling distance=10mm,nodes={fill=blue!40}},
level 3/.style={sibling distance=5mm,nodes={fill=blue!40}}]
\\node {50}
child {node {40}
child {node {10}
}
child {node {12}
}
}
child {node {60}
child {node {19}
child {node {11}
}
}
child {node {18}}
};
\\end{tikzpicture}
\\end{document}`
    },
    {
        title: "11. Algorithm Representation",
        code: `//program11.tex
\\documentclass{article}
\\newcommand{\\que} {\\mathord{?}}
\\usepackage{algorithm, algpseudocode}
\\pagestyle{plain}
\\title{Algorithm to find a number is positive or negative}
\\date{}
\\begin{document}
\\maketitle
\\begin{algorithm} [H]
\\caption {Algorithm to check the sign of a number}\\label{euclid}
\\begin{algorithmic}[1]
\\Procedure {}{}\\newline
\\textbf{Input:} Read the number from user console\\newline
\\textbf{Output:} Display the sign of the given number\\newline
\\State {Read the number num}
\\State {if num $>$ zero}
\\State {num is positive}
\\State{else if num$<$ zero}
\\State {num is negative}
\\State {else num is zero}
\\EndProcedure
\\end{algorithmic}
\\label{alg_1}
\\end{algorithm}
\\end{document}`
    },
    {
        title: "12. Simple Report & Article",
        code: `//program12.tex
\\documentclass[a4paper, 12pt]{report}
\\usepackage{graphicx}
\\usepackage{ragged2e}
\\usepackage{xcolor}
\\begin{document}
\\include {FrontPage-VTU}
\\include {Certificate-VTU}
\\tableofcontents
\\thispagestyle{empty}
\\chapter {Introduction}
\\pagenumbering{arabic}
\\setcounter {page}{1}
\\section{Context based Diversification}
The human era is evolved and dominated through the ultimate intention to know
about the Universe and its assets more and more. This in turn persuaded him to gather
the immense information of need in the form of theory, tools, intuitions, visuals, and
ultimately as the form of abstract objects \\cite{ffy}, \\cite{xyshw}, \\cite{tbhs},
\\cite{dpgk}, \\cite{jaip}, \\cite{pdkgvym}.
\\chapter {Literature Review}
Corresponding Literature works
\\chapter {Methodology}
Corresponding Methodology
\\chapter {Performance analysis}
Corresponding Performance analysis
\\renewcommand{\\thefigure}{4.1}
\\begin{figure}[htbp]
\\centerline {\\includegraphics[scale =.8]{CN}}
\\caption {A portion of concept network for query "hotel California".}
\\label{fig}
\\end{figure}
\\chapter {Conclusion}
Corresponding Conclusion
\\bibliographystyle {IEEEtran}
\\bibliography {prg9}
\\end{document}`
    }
];