// Simulating claims for testing
const claims = [
    { number: "CLM001", status: "In Review", date: "09/05/2024" },
    { number: "CLM002", status: "Approved", date: "08/2/2024" }
];

// DOM Elements
const fileClaimBtn = document.getElementById("fileClaimBtn");
const trackClaimBtn = document.getElementById("trackClaimBtn");
const chatbotBtn = document.getElementById("chatbotBtn");
const fileClaimSection = document.getElementById("fileClaimSection");
const trackClaimSection = document.getElementById("trackClaimSection");
const chatbotSection = document.getElementById("chatbotSection");
const claimForm = document.getElementById("claimForm");
const claimsTableBody = document.getElementById("claimsTableBody");
const claimMessage = document.getElementById("claimMessage");
const searchBar = document.getElementById("searchBar");
const searchResults = document.getElementById("searchResults");
const knowledgeBaseSection = document.getElementById("knowledgeBase");

// Show and Hide Sections
function toggleVisibility(showSection) {
    const sections = [fileClaimSection, trackClaimSection, chatbotSection, knowledgeBaseSection];
    sections.forEach(section => {
        if (section === showSection) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}

fileClaimBtn.addEventListener('click', () => toggleVisibility(fileClaimSection));
trackClaimBtn.addEventListener('click', () => {
    toggleVisibility(trackClaimSection);
    renderClaims();
});
chatbotBtn.addEventListener('click', () => toggleVisibility(chatbotSection));

// Fixing Claim Submission
claimForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const policyNumber = document.getElementById("policyNumber").value;
    const incidentDate = document.getElementById("incidentDate").value;
    const incidentDesc = document.getElementById("incidentDesc").value;

    if (policyNumber && incidentDate && incidentDesc) {
        const newClaim = {
            number: `CLM${(claims.length + 1).toString().padStart(3, '0')}`,
            status: "Pending",
            date: new Date().toLocaleDateString()
        };

        claims.push(newClaim);
        claimMessage.textContent = "Claim submitted successfully!";
        claimMessage.classList.remove('hidden');
        
        // Reset form and hide success message after 4 seconds
        claimForm.reset();
        setTimeout(() => claimMessage.classList.add('hidden'), 4000);

        renderClaims();
    }
});

// Render Claims
function renderClaims() {
    claimsTableBody.innerHTML = '';
    claims.forEach(claim => {
        const row = `<tr>
                        <td>${claim.number}</td>
                        <td>${claim.status}</td>
                        <td>${claim.date}</td>
                    </tr>`;
        claimsTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Knowledge Base Articles
const knowledgeBaseArticles = [
    { title: "How to File a Claim", content: "To file a claim, click the 'Submit a Claim' button and fill in the details." },
    { title: "Checking Claim Status", content: "You can track your claims by clicking the 'Track Claims' button." },
    { title: "Claim Processing Time", content: "Claims are typically processed within 5-10 business days." }
];

// Search Knowledge Base
searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const results = knowledgeBaseArticles.filter(article => article.title.toLowerCase().includes(query));

    if (results.length > 0) {
        searchResults.innerHTML = results.map(article => 
            `<div><h3>${article.title}</h3><p>${article.content}</p></div>`
        ).join('');
        toggleVisibility(knowledgeBaseSection);  // Show the results section
    } else {
        searchResults.innerHTML = '<p>No results found.</p>';
    }
});
