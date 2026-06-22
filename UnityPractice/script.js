let current = 0;
let score = 0;
let answerHistory = [];

loadQuestions();

const normalizedUser =
normalizeText(userAnswer);

const isCorrect =
q.correctAnswers.some(answer =>
normalizeText(answer) === normalizedUser
);

function normalizeText(text)
{
    return text
    .toLowerCase()
    .replace(/\s/g,"")
    .trim();
}

async function loadQuestions()
{
    const params =
    new URLSearchParams(location.search);

    const setName = params.get("set");

    const script =
    document.createElement("script");

    script.src =
    `quizzes/${setName}.js`;

    script.onload = () =>
    {
        showQuestion();
    };

    document.body.appendChild(script);
}

function shuffle(array)
{
    return array.sort(
        ()=>Math.random()-0.5
    );
}

function showQuestion()
{
    document.getElementById("result").innerHTML="";

    const q = questions[current];

    document.getElementById("question").innerHTML =
q.question;

document.getElementById("codeArea").innerHTML = "";

if(q.code)
{
    document.getElementById("codeArea").innerHTML =
    `<pre>${q.code}</pre>`;
}
console.log(document.getElementById("codeArea").innerHTML);

    const choicesDiv =
    document.getElementById("choices");

    choicesDiv.innerHTML="";

    let choices = [
        q.correct,
        ...q.wrong
    ];

    choices = shuffle(choices);

    choices.forEach(choice =>
    {
        const btn =
        document.createElement("button");

        btn.textContent = choice;

        btn.onclick = () =>
        {
            answer(choice);
        };

        choicesDiv.appendChild(btn);
    });
}

function answer(choice)
{
    const q = questions[current];

    if(choice === q.correct)
    {
        score++;

        document.getElementById("result")
        .innerHTML =
        "⭕ 正解";
    }
    else
    {
        document.getElementById("result")
        .innerHTML =
        `❌ 不正解<br>
        正解：${q.correct}`;
    }

    setTimeout(() =>
    {
        current++;

        if(current >= questions.length)
        {
            finish();
        }
        else
        {
            showQuestion();
        }

    },1500);
}

function finish()
{
    document.body.innerHTML =

    `
    <h1>結果</h1>

    <h2>${score} / ${questions.length}</h2>

    <button onclick="location.reload()">
    もう一度挑戦
    </button>

    <br><br>

    <button onclick="location.href='index.html'">
    問題集選択へ戻る
    </button>
    `;
}