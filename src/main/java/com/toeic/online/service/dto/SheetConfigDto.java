package com.toeic.online.service.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SheetConfigDto {
	private List<?> list;
	private String[] headers;
	private List<CellConfigDto> cellConfigList;
	private List<CellConfigDto> cellCustomList;
	private String sheetName;
	private boolean hasIndex = true;
	private int rowStart = 0;
	private boolean hasBorder;
	private int exportType;
    private List<DataDTO> dataDTOs;
}
