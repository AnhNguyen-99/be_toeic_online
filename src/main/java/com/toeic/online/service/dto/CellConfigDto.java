package com.toeic.online.service.dto;

import com.toeic.online.constant.AppConstants;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CellConfigDto {
	private String fieldName;
	private String textAlight = AppConstants.ALIGN_LEFT;
	private String cellType = AppConstants.STRING;
	private boolean hyperLinkEmail;
	private boolean formatNumber = Boolean.TRUE;
	private Integer row;
	private Integer colmn;
	private String cellValue;
	private int firstRow;
	private int lastRow;
	private int firstCol;
	private int lastCol;
	private String[] arrData;

	public CellConfigDto(String fieldName) {
		this.fieldName = fieldName;
	}

	public CellConfigDto(String fieldName, String textAlight, String cellType ) {
		super();
		this.fieldName = fieldName;
		this.textAlight = textAlight;
		this.cellType = cellType;
	}

    public CellConfigDto(String fieldName, String textAlight, String cellType, Boolean hyperLinkEmail ) {
        super();
        this.fieldName = fieldName;
        this.textAlight = textAlight;
        this.cellType = cellType;
        this.hyperLinkEmail = hyperLinkEmail;
    }

    public CellConfigDto(String fieldName, String textAlight, String[] arrData, int firstRow, int lastRow, int firstCol, int lastCol ) {
        super();
        this.fieldName = fieldName;
        this.textAlight = textAlight;
        this.arrData = arrData;
        this.firstRow = firstRow;
        this.lastRow = lastRow;
        this.firstCol = firstCol;
        this.lastCol = lastCol;
    }

	public CellConfigDto(String fieldName, String textAlight, String cellType, boolean formatNumber ) {
		this.fieldName = fieldName;
		this.textAlight = textAlight;
		this.cellType = cellType;
		this.formatNumber = formatNumber;
	}

	public CellConfigDto(Integer row, Integer colmn, String textAlight, String cellValue, String cellType) {
		this.row = row;
		this.colmn = colmn;
		this.cellValue = cellValue;
		this.textAlight = textAlight;
		this.cellType = cellType;
	}

	public CellConfigDto(Integer row, Integer colmn, String textAlight, String cellValue, String cellType,
                         boolean formatNumber) {
		this.row = row;
		this.colmn = colmn;
		this.cellValue = cellValue;
		this.textAlight = textAlight;
		this.cellType = cellType;
		this.formatNumber = formatNumber;
	}
}
