// 1. Import Firebase securely via standard browser CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// 2. Your web app's exact Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsBwab5_hc0pM9qCLTw7jZu4K6fSl_5xw",
  authDomain: "examprep-platform-219c3.firebaseapp.com",
  projectId: "examprep-platform-219c3",
  storageBucket: "examprep-platform-219c3.firebasestorage.app",
  messagingSenderId: "376405485969",
  appId: "1:376405485969:web:3eff3371d47852ed869230"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Quiz State Variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// 4. DOM Element Connections
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const subjectTitle = document.getElementById('subject-title');
const questionTracker = document.getElementById('question-tracker');

// 5. Detect Which Exam/Subject the User Clicked
const urlParams = new URLSearchParams(window.location.search);
const targetExam = urlParams.get('exam');
const targetSubject = urlParams.get('subject');

async function initQuiz() {
    // Update the UI Header based on selection
    if (targetExam) subjectTitle.innerText = targetExam.replace('_', ' ');
    else if (targetSubject) subjectTitle.innerText = targetSubject;
    else subjectTitle.innerText = "Practice Quiz";
    
    questionText.innerText = "Loading questions from database...";
    
    // Build the Database Query
    const qRef = collection(db, "questions");
    let fetchQuery;
    
    if (targetExam) {
        fetchQuery = query(qRef, where("exam_target", "==", targetExam));
    } else if (targetSubject) {
        fetchQuery = query(qRef, where("subject", "==", targetSubject));
    } else {
        fetchQuery = query(qRef); // Fallback to all questions
    }

    // Fetch the data
    try {
        const querySnapshot = await getDocs(fetchQuery);
        querySnapshot.forEach((doc) => {
            questions.push(doc.data());
        });

        if (questions.length > 0) {
            loadQuestion();
        } else {
            questionText.innerText = "No questions found for this topic yet.";
            optionsContainer.innerHTML = "";
        }
    } catch (error) {
        console.error("Error fetching questions: ", error);
        questionText.innerText = "Error connecting to the database.";
    }
}

// 6. Display a Question
function loadQuestion() {
    selectedAnswer = null;
    nextBtn.disabled = true;
    const currentQ = questions[currentQuestionIndex];
    
    questionTracker.innerText = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
    questionText.innerText = currentQ.question_text;
    
    // Clear old options and generate new ones
    optionsContainer.innerHTML = "";
    const options = ['A', 'B', 'C', 'D'];
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.option = opt;
        // Dynamically grab option_A, option_B, etc., from your database fields
        btn.innerHTML = `<span class="option-label">${opt}</span> ${currentQ['option_' + opt]}`;
        
        btn.onclick = () => selectOption(btn, opt);
        optionsContainer.appendChild(btn);
    });
}

// 7. Handle User Clicking an Option
function selectOption(clickedBtn, option) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.classList.remove('selected'));
    
    clickedBtn.classList.add('selected');
    selectedAnswer = option;
    nextBtn.disabled = false; // Enable the "Next" button
}

// 8. Handle "Next Question" Button Click
if(nextBtn) {
    nextBtn.addEventListener('click', () => {
        const correctAns = questions[currentQuestionIndex].correct_answer;
        
        if (selectedAnswer === correctAns) {
            score++;
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });
}

// 9. Display Final Score
function showResults() {
    questionTracker.innerText = "Test Complete";
    questionText.innerText = `You scored ${score} out of ${questions.length}!`;
    
    optionsContainer.innerHTML = "";
    nextBtn.innerText = "Return to Home";
    nextBtn.disabled = false;
    nextBtn.onclick = () => window.location.href = "index.html";
}

// Start the quiz engine when the script loads
initQuiz();