// Smooth scroll and nav active highlight
document.addEventListener('DOMContentLoaded', () => {
    // Smooth links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav on scroll
    const sections = Array.from(document.querySelectorAll('section'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    function onScroll() {
        const y = window.scrollY + 120;
        for (let s of sections) {
            if (s.offsetTop <= y && (s.offsetTop + s.offsetHeight) > y) {
                const id = s.id;
                navLinks.forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#' + id));
            }
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Card -> detail panel
    const cards = document.querySelectorAll('.card');
    const detailPanel = document.getElementById('detailPanel');
    const detailContent = document.getElementById('detailContent');
    const closeDetail = document.getElementById('closeDetail');

    const detailData = {
        ayurveda: {
            title: 'Ayurveda — Quick Summary',
            text: `<p><strong>Origins:</strong> Roots in Vedic culture; classical texts include Charaka Samhita, Sushruta
                    Samhita, and Ashtanga Hridaya (c. 1st millennium BCE — textual forms consolidated between 1000 BCE
                    and 200 CE).</p>
                <p><strong>Founders/Authors:</strong> Traditional figures: Sage Charaka (internal medicine), Sage
                    Sushruta (surgery). These are collections edited over centuries by many scholars.</p>
                <p><strong>Core concepts:</strong> Tridosha (Vata, Pitta, Kapha), Prakriti (constitution), Dhatus
                    (tissues), Agni (digestive fire), Ama (toxins). Therapies: diet, herbs, Panchakarma, yoga, and daily
                    routine (dinacharya).</p>
                <p><strong>Modern relevance:</strong> Widely used in India and globally for chronic wellness, lifestyle
                    medicine, and integrative care; research is ongoing for efficacy and safety of specific
                    formulations.</p>`
        },
        siddha: {
            title: 'Siddha — Quick Summary',
            text: ` <p><strong>Origins:</strong> South India; attributed to Siddhars — mystical practitioners and alchemists.
          Traditional literature in Tamil.</p>
        <p><strong>Core elements:</strong> Uses herbs, minerals (herbo-mineral formulations), yoga/meditation, and
          unique diagnostics.</p>
        <p><strong>Modern relevance:</strong> Practiced mainly in Tamil Nadu and Sri Lanka; Govt supports Siddha under
          AYUSH for education and clinics.</p>`
        },
        unani: {
            title: 'Unani — Quick Summary',
            text: ` <p><strong>Origins:</strong> Based on Greek humoral medicine (Hippocrates), developed by Arab/Persian physicians
          (e.g., Ibn Sina/Avicenna, c. 980–1037 CE) and later adopted in South Asia.</p>
        <p><strong>Core concepts:</strong> Four humors—blood, phlegm, yellow bile, black bile; treatment aims to restore
          humoral balance using diet, regimens and drugs.</p>
        <p><strong>Modern relevance:</strong> Unani clinics and education survive in the Indian subcontinent; research
          into herbal Unani agents continues.</p>`
        },
        yoga: {
            title: 'Yoga — Quick Summary',
            text: ` <p><strong>Origins:</strong> Ancient practice with roots in the Vedic period and the Yoga Sutras of Patanjali
          (c. 2nd century BCE–5th century CE). Archaeological evidence (Indus Valley seals) suggests early meditative
          traditions.</p>
        <p><strong>Core elements:</strong> Asana (poses), Pranayama (breath control), Dhyana (meditation), Niyama & Yama
          (ethical disciplines).</p>
        <p><strong>Modern relevance:</strong> Widely recognized globally for physical fitness, mental health benefits,
          and stress reduction; integrated in preventive health programs.</p>`
        },
        naturopathy: {
            title: 'Naturopathy — Quick Summary',
            text: ` <p><strong>Origins:</strong> Philosophically based on ancient natural healing views; modern naturopathy
          developed in Europe/America in 19th century, adapted widely in India during the 20th century.</p>
        <p><strong>Core methods:</strong> Diet, hydrotherapy, sun & air therapy, exercise, and lifestyle for prevention
          and self-healing.</p>
        <p><strong>Modern relevance:</strong> Naturopathy clinics emphasize prevention and education; often overlap with
          Ayurveda in principles of natural living.</p>`
        },
        homeopathy: {
            title: 'Homeopathy — Quick Summary',
            text: ` <p><strong>Origins:</strong> Developed by Dr. Samuel Hahnemann (late 18th century, Germany). Introduced to India
          in 19th century and widely practiced since.</p>
        <p><strong>Core ideas:</strong> “Like cures like” and potentization (serial dilution); selection of remedies is
          individualized by presenting symptoms.</p>
        <p><strong>Modern relevance:</strong> Popular in India and elsewhere as a complementary approach; debate around
          evidence exists—study specifics and safety for serious illnesses are important.</p>`
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const d = detailData[id];
            if (!d) return;
            detailContent.innerHTML = `<h3>${d.title}</h3><p class="muted">${d.text.replace(/\n/g, '<br>')}</p>`;
            detailPanel.classList.remove('hidden');
            detailPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
    if (closeDetail) closeDetail.addEventListener('click', () => detailPanel.classList.add('hidden'));

    // Contact form handling (demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cname').value.trim();
            const interest = document.getElementById('cinterest').value || 'general';
            document.getElementById('formMsg').textContent = `Thanks ${name || ''}! Demo message received about "${interest}".`;
            contactForm.reset();
            setTimeout(() => document.getElementById('formMsg').textContent = '', 5000);
        });
    }

    // Simulation logic
    const simLogic = {
        ayurveda: {
            indigestion: 'Likely Pitta/Vata imbalance. Suggest warm, light meals; ginger infusion; Triphala at night; consider digestive fire support. (Demo only.)',
            stress: 'Likely Vata imbalance. Suggest daily oil massage (Abhyanga), ashwagandha (consult practitioner), pranayama, sleep routine.',
            insomnia: 'Establish dinacharya, warm milk with saffron or turmeric, relaxation pranayama, reduce screen time at night.',
            cold: 'Supportive herbs: tulsi, steam inhalation, rest and hydration.'
        },
        siddha: {
            indigestion: 'Siddha recommends specific herbal decoctions and dietary regime; consult Siddha practitioner for exact formulations.',
            stress: 'Herbal tonics, therapeutic regimen and meditation recommended.',
            insomnia: 'Herbal formulations + routine and lifestyle adjustments.',
            cold: 'Decoction, topical herbal supporting therapies and rest.'
        },
        unani: {
            indigestion: 'Regulate humors with diet; herbal tonics with warming properties may be used.',
            stress: 'Regimens, massage and calming herbal preparations recommended.',
            insomnia: 'Dietary and regimen correction with calming measures.',
            cold: 'Warming diet, steam, rest.'
        },
        yoga: {
            indigestion: 'Practices: gentle twisting poses, mindful eating and belly breathing.',
            stress: 'Nadi Shodhana pranayama, restorative asanas and meditation.',
            insomnia: 'Bedtime yoga & relaxation protocol, breathwork.',
            cold: 'Gentle movement and breathwork; rest and support .'
        },
        naturopathy: {
            indigestion: 'Hydrotherapy, dietary reset, and lifestyle correction.',
            stress: 'Sunlight, breathwork, outdoor exercise and sleep hygiene.',
            insomnia: 'Light therapy, timing of meals, and relaxation techniques.',
            cold: 'Hydration, steam inhalation, rest and natural supportive measures.'
        },
        homeopathy: {
            indigestion: 'Individualized remedy selection; consult a qualified homeopath.',
            stress: 'Remedy chosen by totality of symptoms; supportive counseling helpful.',
            insomnia: 'Homeopathic remedy plus sleep hygiene.',
            cold: 'Symptom-specific remedy selection.'
        }
    };

    const runSimBtn = document.getElementById('runSim');
    const clearSimBtn = document.getElementById('clearSim');
    const simResult = document.getElementById('simResult');

    if (runSimBtn) {
        runSimBtn.addEventListener('click', () => {
            const sys = document.getElementById('simSystem').value;
            const sym = document.getElementById('simSymptom').value;
            const res = (simLogic[sys] && simLogic[sys][sym]) ? simLogic[sys][sym] : 'Please select valid options.';
            simResult.innerHTML = `<h4>Demo Recommendation</h4><p class="muted"><strong>System:</strong> ${sys} <br><strong>Symptom:</strong> ${sym} <br><strong>Suggestion:</strong> ${res}</p>`;
            simResult.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (clearSimBtn) {
        clearSimBtn.addEventListener('click', () => {
            document.getElementById('simSystem').value = 'ayurveda';
            document.getElementById('simSymptom').value = 'indigestion';
            simResult.innerHTML = '';
        });
    }

    // Print / Download notes (open print dialog)
    const printBtn = document.getElementById('printNotes');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            // Create a printable window with notes section only
            const notes = document.querySelector('.notes').innerHTML;
            const header = `<h1>Ayurveda & Traditional Medicine — Notes</h1><hr>`;
            const w = window.open('', '_blank', 'width=900,height=800');
            w.document.write(`<html><head><title>Notes</title>
        <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#163517} h1{color:#0a5a23} .note{margin-bottom:18px}</style>
        </head><body>${header}<div>${notes}</div><script>window.onload=function(){window.print();}</script></body></html>`);
            w.document.close();
        });
    }

    // close panels on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!detailPanel.classList.contains('hidden')) detailPanel.classList.add('hidden');
        }
    });

}); // DOMContentLoaded end
