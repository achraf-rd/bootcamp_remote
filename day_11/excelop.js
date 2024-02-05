const ExcelJS = require('exceljs');
const fs = require('fs')
// Function to calculate bonus based on annual salary

function calculateBonus(annualSalary, lowerLimit, upperLimit, lowerBonus, upperBonus){
    if (annualSalary < lowerLimit) {
        return { percentage: lowerBonus, amount: annualSalary * lowerBonus };
    } else if (annualSalary >= lowerLimit && annualSalary <= upperLimit) {
        return { percentage: upperBonus, amount: annualSalary * upperBonus };
    } else {
        return { percentage: 0, amount: 0 };
    }
}


async function processExcelFile(inputFilePath, outputFilePath,config){
    try {
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Read the Excel file
        await workbook.xlsx.readFile(inputFilePath);

        // Access the first worksheet
        const worksheet = workbook.getWorksheet(1);

        // Add new columns for BonusPercentage and BonusAmount
        worksheet.getColumn('D').header = 'BonusPercentage';
        worksheet.getColumn('E').header = 'BonusAmount';

        // Calculate bonuses and update the worksheet
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber > 1) {
                const annualSalary = row.getCell('B').value;
                const { percentage, amount } = calculateBonus(annualSalary,
                    config.lowerLimit,
                    config.upperLimit,
                    config.lowerBonus,
                    config.upperBonus
                    );

                row.getCell('D').value = percentage;
                row.getCell('E').value = amount;
            }
        });

        // Write the modified content to a new Excel file
        await workbook.xlsx.writeFile(outputFilePath);
        console.log('Excel file processed and bonuses calculated successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Command-line arguments: input file path and output file path
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];
const configFilePath = process.argv[4];

// Check if input and output file paths are provided to handle the error
if (!inputFilePath || !outputFilePath) {  //the config file is optional!
    console.error('Usage: node excelop.js <inputFilePath> <outputFilePath> [configFile]');
} else {
        // Default bonus calculation configuration

    const defaultConfig = {
        lowerLimit: 50000,
        upperLimit: 100000,
        lowerBonus: 0.05,
        upperBonus: 0.07,
    };
    // A ternary to Load bonus calculation configuration from command-line arguments or a configuration file
    const config = configFilePath ? JSON.parse(fs.readFileSync(configFilePath, 'utf8')) : defaultConfig;
    console.log(config);
    // Execute the script
    processExcelFile(inputFilePath, outputFilePath, config);
 
}

