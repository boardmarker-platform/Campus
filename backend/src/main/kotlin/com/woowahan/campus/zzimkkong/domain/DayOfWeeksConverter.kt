package com.woowahan.campus.zzimkkong.domain

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter
class DayOfWeeksConverter : AttributeConverter<MutableList<DayOfWeeks>, String> {

    override fun convertToDatabaseColumn(attribute: MutableList<DayOfWeeks>): String {
        return attribute.joinToString(",") { it.name }
    }

    override fun convertToEntityAttribute(dbData: String): MutableList<DayOfWeeks> {
        return dbData.split(",")
            .map(DayOfWeeks.Companion::create)
            .toMutableList()
    }
}
