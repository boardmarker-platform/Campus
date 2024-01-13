package com.woowahan.campus.zzimkkong.domain

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter
import java.util.SortedSet

@Converter
class DayOfWeeksConverter : AttributeConverter<SortedSet<DayOfWeeks>, String> {

    override fun convertToDatabaseColumn(attribute: SortedSet<DayOfWeeks>): String {
        return attribute.joinToString(",") { it.name }
    }

    override fun convertToEntityAttribute(dbData: String): SortedSet<DayOfWeeks> {
        return dbData.split(",")
            .map(DayOfWeeks.Companion::from)
            .toSortedSet()
    }
}
