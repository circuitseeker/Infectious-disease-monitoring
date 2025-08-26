// Main Application Logic
class DiseaseMonitor {
    constructor() {
        this.currentData = null;
        this.analysisResults = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTabs();
        this.loadSampleData();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // File upload event listeners
        this.setupFileUploads();
    }

    setupFileUploads() {
        const photoInput = document.getElementById('photoInput');
        const reportInput = document.getElementById('reportInput');

        if (photoInput) {
            photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
        }

        if (reportInput) {
            reportInput.addEventListener('change', (e) => this.handleReportUpload(e));
        }

        // Drag and drop functionality
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const photoUpload = document.getElementById('photoUpload');
        const reportUpload = document.getElementById('reportUpload');

        [photoUpload, reportUpload].forEach(area => {
            if (!area) return;

            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--primary-color)';
                area.style.backgroundColor = 'var(--bg-secondary)';
            });

            area.addEventListener('dragleave', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--border-color)';
                area.style.backgroundColor = 'transparent';
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--border-color)';
                area.style.backgroundColor = 'transparent';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    if (area === photoUpload) {
                        this.handlePhotoUpload({ target: { files } });
                    } else {
                        this.handleReportUpload({ target: { files } });
                    }
                }
            });
        });
    }

    handlePhotoUpload(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        console.log(`Processing ${files.length} photo(s)`);
        
        // Show loading state
        this.showLoadingState('photoUpload', 'Analyzing photos...');
        
        // Simulate photo analysis (replace with actual AI processing)
        setTimeout(() => {
            this.processPhotoResults(files);
            this.hideLoadingState('photoUpload');
        }, 2000);
    }

    handleReportUpload(event) {
        const files = event.target.files;
        if (files.length === 0) return;

        console.log(`Processing ${files.length} report(s)`);
        
        // Show loading state
        this.showLoadingState('reportUpload', 'Processing reports...');
        
        // Simulate report analysis (replace with actual AI processing)
        setTimeout(() => {
            this.processReportResults(files);
            this.hideLoadingState('reportUpload');
        }, 3000);
    }

    processPhotoResults(files) {
        // Generate synthetic analysis results
        const results = this.generateSyntheticPhotoResults(files);
        this.displayPhotoResults(results);
        
        // Scroll to results section
        document.getElementById('analysis').scrollIntoView({ behavior: 'smooth' });
    }

    processReportResults(files) {
        // Generate synthetic analysis results
        const results = this.generateSyntheticReportResults(files);
        this.displayReportResults(results);
        
        // Scroll to results section
        document.getElementById('analysis').scrollIntoView({ behavior: 'smooth' });
    }

    generateSyntheticPhotoResults(files) {
        const diseases = [
            'Dermatitis', 'Psoriasis', 'Eczema', 'Acne', 'Rosacea',
            'Fungal Infection', 'Bacterial Infection', 'Viral Rash',
            'Allergic Reaction', 'Contact Dermatitis'
        ];

        const symptoms = [
            'Redness', 'Swelling', 'Itching', 'Pain', 'Blisters',
            'Scaling', 'Crusting', 'Oozing', 'Dryness', 'Warmth'
        ];

        return {
            files: Array.from(files).map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            })),
            analysis: {
                primaryDisease: diseases[Math.floor(Math.random() * diseases.length)],
                confidence: (Math.random() * 0.4 + 0.6).toFixed(2), // 60-100%
                symptoms: symptoms.sort(() => 0.5 - Math.random()).slice(0, 3),
                severity: ['Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
                recommendations: [
                    'Consult a dermatologist for proper diagnosis',
                    'Avoid scratching the affected area',
                    'Keep the area clean and dry',
                    'Consider over-the-counter treatments'
                ]
            }
        };
    }

    generateSyntheticReportResults(files) {
        const conditions = [
            'Upper Respiratory Infection', 'Gastroenteritis', 'Urinary Tract Infection',
            'Skin Infection', 'Ear Infection', 'Eye Infection', 'Dental Infection'
        ];

        const pathogens = [
            'Staphylococcus aureus', 'Streptococcus pneumoniae', 'Escherichia coli',
            'Influenza virus', 'Rhinovirus', 'Herpes simplex virus', 'Candida albicans'
        ];

        return {
            files: Array.from(files).map(file => ({
                name: file.name,
                size: file.size,
                type: file.type
            })),
            analysis: {
                primaryCondition: conditions[Math.floor(Math.random() * conditions.length)],
                confidence: (Math.random() * 0.3 + 0.7).toFixed(2), // 70-100%
                suspectedPathogen: pathogens[Math.floor(Math.random() * pathogens.length)],
                severity: ['Mild', 'Moderate', 'Severe'][Math.floor(Math.random() * 3)],
                riskFactors: [
                    'Age-related immune decline',
                    'Underlying health conditions',
                    'Recent antibiotic use',
                    'Environmental exposure'
                ],
                recommendations: [
                    'Complete prescribed antibiotic course',
                    'Monitor symptoms closely',
                    'Follow up with healthcare provider',
                    'Practice good hygiene'
                ]
            }
        };
    }

    displayPhotoResults(results) {
        const resultsContainer = document.getElementById('diseaseResults');
        if (!resultsContainer) return;

        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
            <div class="result-header">
                <h3>Photo Analysis Results</h3>
                <span class="confidence-score">${(results.analysis.confidence * 100).toFixed(0)}% Confidence</span>
            </div>
            <div class="result-content">
                <div class="result-item">
                    <strong>Primary Disease:</strong> ${results.analysis.primaryDisease}
                </div>
                <div class="result-item">
                    <strong>Severity:</strong> ${results.analysis.severity}
                </div>
                <div class="result-item">
                    <strong>Detected Symptoms:</strong> ${results.analysis.symptoms.join(', ')}
                </div>
                <div class="result-item">
                    <strong>Recommendations:</strong>
                    <ul>
                        ${results.analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultCard);
    }

    displayReportResults(results) {
        const resultsContainer = document.getElementById('diseaseResults');
        if (!resultsContainer) return;

        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
            <div class="result-header">
                <h3>Medical Report Analysis</h3>
                <span class="confidence-score">${(results.analysis.confidence * 100).toFixed(0)}% Confidence</span>
            </div>
            <div class="result-content">
                <div class="result-item">
                    <strong>Primary Condition:</strong> ${results.analysis.primaryCondition}
                </div>
                <div class="result-item">
                    <strong>Suspected Pathogen:</strong> ${results.analysis.suspectedPathogen}
                </div>
                <div class="result-item">
                    <strong>Severity:</strong> ${results.analysis.severity}
                </div>
                <div class="result-item">
                    <strong>Risk Factors:</strong>
                    <ul>
                        ${results.analysis.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
                <div class="result-item">
                    <strong>Recommendations:</strong>
                    <ul>
                        ${results.analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultCard);
    }

    showLoadingState(uploadId, message) {
        const uploadArea = document.getElementById(uploadId);
        if (!uploadArea) return;

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-state';
        loadingDiv.innerHTML = `
            <div class="spinner"></div>
            <p>${message}</p>
        `;

        uploadArea.appendChild(loadingDiv);
    }

    hideLoadingState(uploadId) {
        const uploadArea = document.getElementById(uploadId);
        if (!uploadArea) return;

        const loadingState = uploadArea.querySelector('.loading-state');
        if (loadingState) {
            loadingState.remove();
        }
    }

    initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    loadSampleData() {
        // Load sample data for demonstration
        this.currentData = this.generateSampleData();
    }

    generateSampleData() {
        return {
            diseases: [
                { name: 'Upper Respiratory Infection', count: 45, trend: 'increasing' },
                { name: 'Gastroenteritis', count: 32, trend: 'stable' },
                { name: 'Skin Infection', count: 28, trend: 'decreasing' },
                { name: 'Urinary Tract Infection', count: 19, trend: 'stable' },
                { name: 'Ear Infection', count: 15, trend: 'increasing' }
            ],
            trends: [
                { month: 'Jan', cases: 120 },
                { month: 'Feb', cases: 135 },
                { month: 'Mar', cases: 142 },
                { month: 'Apr', cases: 158 },
                { month: 'May', cases: 145 },
                { month: 'Jun', cases: 162 }
            ]
        };
    }

    initializeCharts() {
        // Initialize dashboard charts
        this.createDiseaseChart();
        this.createTrendChart();
    }

    createDiseaseChart() {
        const ctx = document.getElementById('diseaseChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.currentData.diseases.map(d => d.name),
                datasets: [{
                    data: this.currentData.diseases.map(d => d.count),
                    backgroundColor: [
                        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.currentData.trends.map(t => t.month),
                datasets: [{
                    label: 'Monthly Cases',
                    data: this.currentData.trends.map(t => t.cases),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Global functions for button onclick handlers
function analyzePhotos() {
    const photoInput = document.getElementById('photoInput');
    if (photoInput && photoInput.files.length > 0) {
        window.diseaseMonitor.handlePhotoUpload({ target: { files: photoInput.files } });
    } else {
        alert('Please select photos to analyze first.');
    }
}

function analyzeReports() {
    const reportInput = document.getElementById('reportInput');
    if (reportInput && reportInput.files.length > 0) {
        window.diseaseMonitor.handleReportUpload({ target: { files: reportInput.files } });
    } else {
        alert('Please select reports to analyze first.');
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.diseaseMonitor = new DiseaseMonitor();
});
