import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateModernCV = (userData) => {
  const doc = new jsPDF();
  
  // Modern color scheme
  const primaryColor = [41, 128, 185]; // Blue
  const secondaryColor = [52, 73, 94]; // Dark gray
  const accentColor = [46, 204, 113]; // Green
  const lightGray = [236, 240, 241];
  
  let yPosition = 20;
  
  // Header with colored background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont(undefined, 'bold');
  doc.text(userData.name || 'Your Name', 105, 25, { align: 'center' });
  
  // Title/Position
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text(userData.title || userData.role || 'Professional', 105, 35, { align: 'center' });
  
  yPosition = 60;
  
  // Contact Information Bar
  doc.setFillColor(...lightGray);
  doc.rect(0, yPosition - 5, 210, 15, 'F');
  
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(9);
  const contactInfo = [
    userData.email || '',
    userData.phone || '',
    userData.location || userData.city || ''
  ].filter(Boolean).join('  •  ');
  
  doc.text(contactInfo, 105, yPosition + 3, { align: 'center' });
  
  yPosition += 20;
  
  // Professional Summary (if available)
  if (userData.bio || userData.summary || userData.about) {
    addSection(doc, 'PROFESSIONAL SUMMARY', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const summaryText = userData.bio || userData.summary || userData.about;
    const splitSummary = doc.splitTextToSize(summaryText, 170);
    doc.text(splitSummary, 20, yPosition);
    yPosition += (splitSummary.length * 5) + 10;
  }
  
  // Education
  if (userData.education && userData.education.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);
    addSection(doc, 'EDUCATION', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    userData.education.forEach((edu) => {
      yPosition = checkPageBreak(doc, yPosition, 25);
      
      // Degree with colored bullet
      doc.setFillColor(...accentColor);
      doc.circle(22, yPosition - 1, 1.5, 'F');
      
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(edu.degree || edu.qualification || '', 27, yPosition);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100, 100, 100);
      yPosition += 5;
      doc.text(edu.institution || edu.school || '', 27, yPosition);
      
      if (edu.year || edu.graduationYear || edu.duration) {
        yPosition += 5;
        doc.setFontSize(9);
        doc.text(edu.year || edu.graduationYear || edu.duration || '', 27, yPosition);
      }
      
      if (edu.grade || edu.gpa || edu.percentage) {
        doc.text(`  •  ${edu.grade || edu.gpa || edu.percentage}`, 60, yPosition);
      }
      
      yPosition += 10;
    });
    
    yPosition += 5;
  }
  
  // Work Experience
  if (userData.experience && userData.experience.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);
    addSection(doc, 'WORK EXPERIENCE', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    userData.experience.forEach((exp) => {
      yPosition = checkPageBreak(doc, yPosition, 30);
      
      // Position with colored bullet
      doc.setFillColor(...accentColor);
      doc.circle(22, yPosition - 1, 1.5, 'F');
      
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(exp.position || exp.title || exp.role || '', 27, yPosition);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100, 100, 100);
      yPosition += 5;
      doc.text(exp.company || exp.organization || '', 27, yPosition);
      
      if (exp.duration || exp.period || exp.year) {
        yPosition += 5;
        doc.setFontSize(9);
        doc.text(exp.duration || exp.period || exp.year || '', 27, yPosition);
      }
      
      if (exp.description) {
        yPosition += 5;
        doc.setFontSize(9);
        const descLines = doc.splitTextToSize(exp.description, 160);
        doc.text(descLines, 27, yPosition);
        yPosition += (descLines.length * 4);
      }
      
      yPosition += 10;
    });
    
    yPosition += 5;
  }
  
  // Skills
  if (userData.skills && userData.skills.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);
    addSection(doc, 'SKILLS', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    // Display skills in a grid format with colored tags
    let xPos = 20;
    let skillYPos = yPosition;
    
    userData.skills.forEach((skill, index) => {
      const skillText = typeof skill === 'string' ? skill : skill.name || skill.skill;
      const skillWidth = doc.getTextWidth(skillText) + 8;
      
      if (xPos + skillWidth > 190) {
        xPos = 20;
        skillYPos += 8;
        skillYPos = checkPageBreak(doc, skillYPos, 10);
      }
      
      // Skill tag background
      doc.setFillColor(...lightGray);
      doc.roundedRect(xPos, skillYPos - 4, skillWidth, 6, 1, 1, 'F');
      
      // Skill text
      doc.setTextColor(...primaryColor);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(skillText, xPos + 4, skillYPos);
      
      xPos += skillWidth + 4;
    });
    
    yPosition = skillYPos + 15;
  }
  
  // Projects
  if (userData.projects && userData.projects.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);
    addSection(doc, 'PROJECTS', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    userData.projects.forEach((project) => {
      yPosition = checkPageBreak(doc, yPosition, 25);
      
      doc.setFillColor(...accentColor);
      doc.circle(22, yPosition - 1, 1.5, 'F');
      
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(project.name || project.title || '', 27, yPosition);
      
      if (project.description) {
        yPosition += 5;
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        const descLines = doc.splitTextToSize(project.description, 160);
        doc.text(descLines, 27, yPosition);
        yPosition += (descLines.length * 4);
      }
      
      if (project.technologies || project.tech) {
        yPosition += 4;
        doc.setFontSize(8);
        doc.setTextColor(...primaryColor);
        const techText = Array.isArray(project.technologies) 
          ? project.technologies.join(', ') 
          : project.technologies || project.tech;
        doc.text(`Tech: ${techText}`, 27, yPosition);
      }
      
      yPosition += 10;
    });
    
    yPosition += 5;
  }
  
  // Certifications
  if (userData.certifications && userData.certifications.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);
    addSection(doc, 'CERTIFICATIONS', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    userData.certifications.forEach((cert) => {
      yPosition = checkPageBreak(doc, yPosition, 15);
      
      doc.setFillColor(...accentColor);
      doc.circle(22, yPosition - 1, 1.5, 'F');
      
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      const certName = typeof cert === 'string' ? cert : cert.name || cert.title;
      doc.text(certName, 27, yPosition);
      
      if (typeof cert === 'object' && (cert.issuer || cert.year)) {
        yPosition += 5;
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        const certDetails = [cert.issuer, cert.year].filter(Boolean).join(' • ');
        doc.text(certDetails, 27, yPosition);
      }
      
      yPosition += 8;
    });
  }
  
  // Languages (if available)
  if (userData.languages && userData.languages.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 25);
    addSection(doc, 'LANGUAGES', yPosition, primaryColor, accentColor);
    yPosition += 10;
    
    userData.languages.forEach((lang) => {
      const langText = typeof lang === 'string' ? lang : `${lang.language || lang.name} - ${lang.proficiency || 'Proficient'}`;
      doc.setFillColor(...accentColor);
      doc.circle(22, yPosition - 1, 1.5, 'F');
      
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(10);
      doc.text(langText, 27, yPosition);
      yPosition += 7;
    });
  }
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(...primaryColor);
    doc.rect(0, 287, 210, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, 105, 293, { align: 'center' });
  }
  
  return doc;
};

// Helper function to add section headers
function addSection(doc, title, yPos, primaryColor, accentColor) {
  doc.setFillColor(...accentColor);
  doc.rect(15, yPos - 4, 3, 8, 'F');
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.text(title, 20, yPos);
  
  // Underline
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.5);
  doc.line(20, yPos + 2, 190, yPos + 2);
}

// Helper function to check if we need a new page
function checkPageBreak(doc, yPos, requiredSpace) {
  if (yPos + requiredSpace > 280) {
    doc.addPage();
    return 20;
  }
  return yPos;
}

// Main export function
export const downloadCV = (userData, filename = 'My_CV.pdf') => {
  try {
    const doc = generateModernCV(userData);
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
};

export default {
  generateModernCV,
  downloadCV
};