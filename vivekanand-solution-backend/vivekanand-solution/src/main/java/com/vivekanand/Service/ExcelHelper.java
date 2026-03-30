package com.vivekanand.Service;

import com.vivekanand.Entity.FeeStructure;
import org.apache.poi.ss.usermodel.*;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {

    private static String getCellValue(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                try {
                    return String.valueOf(cell.getNumericCellValue());
                } catch (IllegalStateException e) {
                    return cell.getStringCellValue();
                }
            default:
                return "";
        }
    }

    private static Double parseDouble(String value) {
        if (value == null || value.isEmpty()) return 0.0;
        try {
            // remove commas and symbols like "/-"
            return Double.parseDouble(value.replaceAll("[^0-9.]", ""));
        } catch (Exception e) {
            return 0.0;
        }
    }

    public static List<FeeStructure> excelToFeeStructures(InputStream is) {
        List<FeeStructure> feeStructures = new ArrayList<>();
        try (Workbook workbook = WorkbookFactory.create(is)) {
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rows = sheet.iterator();
            int rowNumber = 0;

            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // Skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                FeeStructure fee = new FeeStructure();
                fee.setClassName(getCellValue(currentRow.getCell(0)));
                fee.setBoard(getCellValue(currentRow.getCell(1)));
                fee.setSubjects(getCellValue(currentRow.getCell(2)));

                fee.setTuitionFee(parseDouble(getCellValue(currentRow.getCell(3))));
                fee.setExtraStudentFee(parseDouble(getCellValue(currentRow.getCell(4))));
                fee.setTotalFee(parseDouble(getCellValue(currentRow.getCell(5))));

                fee.setTimePerDay(getCellValue(currentRow.getCell(6)));
                fee.setDaysPerWeek(getCellValue(currentRow.getCell(7)));
                fee.setLocation(getCellValue(currentRow.getCell(8)));

                feeStructures.add(fee);
                rowNumber++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return feeStructures;
    }
}
