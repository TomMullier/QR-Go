import jsPDF from 'jspdf';


const doc = new jsPDF();


function createPDF() {
  

  doc.addImage('../img/fond-page.png', 'PNG', 0, 0, 210, 297);
  doc.addFont("../fonts/Montserrat-regular.ttf", "Montserrat-regular", "normal");

  doc.setFontSize(50);
  doc.setFont('Montserrat-regular');
  doc.text("Step Name", 105, 60, {align: 'center'}, null);

  doc.save("NOM DU PARCOURS.pdf");
}


document.getElementById('div_scaner_title_txt').addEventListener('click', createPDF);