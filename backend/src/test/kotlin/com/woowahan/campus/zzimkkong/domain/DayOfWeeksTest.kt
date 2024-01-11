package com.woowahan.campus.zzimkkong.domain

import io.kotest.assertions.assertSoftly
import io.kotest.assertions.throwables.shouldThrow
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.result.beSuccess

class DayOfWeeksTest : StringSpec({

    "요일명이 올바르면 정상적으로 생성" {
        DayOfWeeks.entries.forEach {
            assertSoftly { beSuccess(DayOfWeeks.create(it.name)) }
        }
    }

    "요일명이 올바르지 않으면 예외" {
        shouldThrow<IllegalArgumentException> {
            DayOfWeeks.create("wrongName")
        }
    }
})
