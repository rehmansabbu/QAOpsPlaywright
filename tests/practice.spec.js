// const { test } = require('@playwright/test')

// const ExcelJS = require('exceljs')

// async function excelTest(){

// const workbook1=new ExcelJS.Workbook();
// workbook1.xlsx.readFile("Path");
// const worksheet = workbook1.getWorksheet('Sheet1');
// worksheet.eachRow((row,rowNumber) => {
//     row.eachCell((cell,colNumber) =>{

//         if(cell.value === "Apple"){
//             console.log(rowNumber);
//             console.log(colNumber);
//         }
//     })
// })

// const cell = worksheet.getCell(3,2);
// cell.value = "Iphone";
// workbook1.xlsx.writeFile("Path");

// }

// excelTest();