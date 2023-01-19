const User = require('../../models/User');
const XLSX = require('xlsx');

const convertJsonToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(User);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "User")
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "userData.xlsx")
}

convertJsonToExcel() 

export default convertJsonToExcel;