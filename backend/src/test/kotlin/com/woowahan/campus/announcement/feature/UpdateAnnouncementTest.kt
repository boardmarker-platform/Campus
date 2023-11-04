package com.woowahan.campus.announcement.feature

import com.woowahan.campus.fixture.createAnnouncementRequest
import com.woowahan.campus.fixture.createUpdateAnnouncementRequest
import com.woowahan.campus.utils.DatabaseCleaner
import io.kotest.core.spec.style.BehaviorSpec
import io.kotest.matchers.shouldBe
import io.restassured.RestAssured
import io.restassured.http.ContentType
import openapi.model.CreateAnnouncementRequest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpHeaders
import support.test.beforeRootTest
import java.util.Base64

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UpdateAnnouncementTest(
    @LocalServerPort
    val port: Int,
    private val databaseCleaner: DatabaseCleaner,
) : BehaviorSpec({

    RestAssured.port = port

    beforeRootTest {
        databaseCleaner.clean()
    }

    Given("글ID, 제목, 내용, 작성자, 관리자 비밀번호를 받는다.") {
        val password = "1234".toByteArray()
        val savedAnnouncementId = createAnnouncement(password, createAnnouncementRequest(author = "author"))

        val updateAnnouncementRequest = createUpdateAnnouncementRequest(author = "author")
        val givenSpec = RestAssured
            .given().log().all()
            .contentType(ContentType.JSON)
            .header(HttpHeaders.AUTHORIZATION, "Basic ${String(Base64.getEncoder().encode(password))}")
            .body(updateAnnouncementRequest)

        When("작성자, 제목, 내용, 날짜를 수정한다.") {
            val response = givenSpec.`when`().put("/api/announcements/{id}", savedAnnouncementId)
                .then().log().all()
                .extract()

            Then("200 응답과 저장된 글의 ID를 반환한다.") {
                response.statusCode() shouldBe 200
                // TODO: announcement 프로퍼티 값 수정됐는지 검증
            }

            Then("슬랙에 수정을 요청한다.") {
                // TODO: 슬랙 연동 및 모킹 테스트
            }
        }
    }

    Given("글ID, 제목, 내용, 작성자, 관리자 비밀번호를 받는다.") {
        val password = "1234".toByteArray()
        val savedAnnouncementId = createAnnouncement(password, createAnnouncementRequest(author = "author"))

        val updateAnnouncementRequest = createUpdateAnnouncementRequest(author = "differentAuthor")
        val givenSpec = RestAssured
            .given().log().all()
            .contentType(ContentType.JSON)
            .header(HttpHeaders.AUTHORIZATION, "Basic ${String(Base64.getEncoder().encode(password))}")
            .body(updateAnnouncementRequest)

        When("잘못된 내용 요청을 확인했다.") {
            val response = givenSpec.`when`().put("/api/announcements/{id}", savedAnnouncementId)
                .then().log().all()
                .extract()

            Then("400 상태 코드를 반환한다.") {
                response.statusCode() shouldBe 401
            }
        }
    }
})

private fun createAnnouncement(
    password: ByteArray,
    createAnnouncementRequest: CreateAnnouncementRequest
) = RestAssured
    .given().log().all()
    .contentType(ContentType.JSON)
    .header(HttpHeaders.AUTHORIZATION, "Basic ${String(Base64.getEncoder().encode(password))}")
    .body(createAnnouncementRequest)
    .`when`().post("/api/announcements")
    .then().log().all()
    .extract()
    .header(HttpHeaders.LOCATION)
    .split("/").last().toInt()