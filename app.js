function showBarcodeScanner() {
    hideAll();
    document.getElementById('scanner').classList.remove('hidden');
}

function showScanner() {
    hideAll();
    document.getElementById('qrScanner').classList.remove('hidden');
    const qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
            document.getElementById("barcodeResult").innerText = `Scanned Code: ${qrCodeMessage}`;
            qrScanner.stop().catch(err => console.error("Error stopping scanner:", err));
        },
        errorMessage => {}
    );
}

function showChatbot() {
    hideAll();
    document.getElementById('chatbot').classList.remove('hidden');
}

function showHealthAssessment() {
    hideAll();
    document.getElementById('healthAssessment').classList.remove('hidden');
}

function goBack() {
    hideAll();
}

function hideAll() {
    document.getElementById('scanner').classList.add('hidden');
    document.getElementById('qrScanner').classList.add('hidden');
    document.getElementById('chatbot').classList.add('hidden');
    document.getElementById('healthAssessment').classList.add('hidden');
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === "") return;
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<p><strong>User:</strong> ${userInput}</p>`;
    setTimeout(() => {
        chatbox.innerHTML += `<p><strong>Chatbot:</strong> ${generateResponse(userInput)}</p>`;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 1000);
    document.getElementById('userInput').value = "";
}

function generateResponse(input) {
    if (input.toLowerCase().includes("immunity")) return "Eat vitamin-rich foods, exercise, and stay hydrated.";
    if (input.toLowerCase().includes("diet")) return "A balanced diet should include proteins, healthy fats, and fiber.";
    return "I'm here to help! Ask me anything about health.";
}

function assessHealth() {
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    const symptoms = document.getElementById("symptoms").value.toLowerCase();
    const bmi = weight / (height * height);
    let risk = "Low";

    if (bmi > 30) risk = "High - Obesity Risk";
    if (bmi > 25) risk = "Moderate - Overweight Risk";
    if (symptoms.includes("cough") || symptoms.includes("fever")) risk = "High - Possible Infection";

    document.getElementById("assessmentResult").innerText = `Health Risk Level: ${risk}`;

}