package woowacourse.campus.ui.home

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import woowacourse.campus.domain.model.AttendanceStatus

class HomeScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    private val uiState: MutableState<HomeUiState> = mutableStateOf(HomeUiState.Loading)

    @Before
    fun setup() {
        composeTestRule.setContent {
            HomeAttendanceBoard(uiState = uiState.value)
        }
    }

    @Test
    fun Home_Screen이_Loading_중일_때_닉네임은_보이고_출결_상태는_보이지_않는다() {
        uiState.value = HomeUiState.Loading

        composeTestRule.onNodeWithText("안녕하세요 레아").assertExists()
        composeTestRule.onNodeWithText("출석 처리 되었습니다.").assertDoesNotExist()
    }

    @Test
    fun Home_Screen에_데이터가_로딩이_되면_닉네임과_등교_상태가_보인다() {
        uiState.value = HomeUiState.Success(
            latestAnnouncements = listOf(), attendanceStatus = AttendanceStatus.ATTENDANCE,
        )

        composeTestRule.onNodeWithText("안녕하세요 레아").assertExists()
        composeTestRule.onNodeWithText("출석 처리 되었습니다.").assertExists()
    }

    @Test
    fun Home_Screen에_데이터가_로딩이_되면_닉네임과_결석_상태가_보인다() {
        uiState.value = HomeUiState.Success(
            latestAnnouncements = listOf(), attendanceStatus = AttendanceStatus.ABSENCE,
        )

        composeTestRule.onNodeWithText("안녕하세요 레아").assertExists()
        composeTestRule.onNodeWithText("결석 처리 되었습니다.").assertExists()
    }
}
