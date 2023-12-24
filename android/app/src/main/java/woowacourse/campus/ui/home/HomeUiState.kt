package woowacourse.campus.ui.home

import woowacourse.campus.domain.model.Announcement
import woowacourse.campus.domain.model.AttendanceStatus

sealed interface HomeUiState {
    data class Success(
        val latestAnnouncements: List<Announcement>,
        val attendanceStatus: AttendanceStatus,
    ) : HomeUiState

    data object Loading : HomeUiState
}
