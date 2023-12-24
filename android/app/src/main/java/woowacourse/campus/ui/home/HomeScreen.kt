package woowacourse.campus.ui.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import woowacourse.campus.R
import woowacourse.campus.domain.model.AttendanceStatus
import woowacourse.campus.ui.common.AttendanceStatusBoard
import woowacourse.campus.ui.theme.WoowaCampusTheme

@Composable
internal fun HomeScreen(
    homeViewModel: HomeViewModel = viewModel(factory = HomeViewModel.Factory),
    onAnnouncementBoardClick: () -> Unit,
    onAnnouncementItemClick: (announcementId: Long) -> Unit,
) {
    val uiState: HomeUiState by homeViewModel.uiState.collectAsStateWithLifecycle()
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        AttendanceBoard(uiState)
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(scrollState),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Spacer(modifier = Modifier.padding(12.dp))
            AnnouncementList(uiState, onAnnouncementBoardClick, onAnnouncementItemClick)
            Spacer(modifier = Modifier.padding(18.dp))
            ShortcutList()
            Spacer(modifier = Modifier.padding(32.dp))
        }
    }
}

@Composable
private fun AttendanceBoard(uiState: HomeUiState) {
    val nickname = "레아"  // 닉네임을 어디서 입력받고 어디서 관리할 것인지
    when (uiState) {
        is HomeUiState.Success -> {
            AttendanceStatusBoard(
                nickname = stringResource(R.string.home_attendance_nickname, nickname),
                attendanceStatus = stringResource(
                    R.string.home_attendance_status,
                    uiState.attendanceStatus.toKorean()
                ),
                // 캠퍼스 구분 및 출석 시간을 어떻게 가져올 것인지
                attendanceDetail = "( 선릉캠퍼스 | 10:00:58 )",
            )
        }

        is HomeUiState.Loading -> {
            AttendanceStatusBoard(
                nickname = stringResource(R.string.home_attendance_nickname, nickname),
            )
        }
    }
}

// 어디서 이 작업을 해주면 좋을까
@Composable
private fun AttendanceStatus.toKorean(): String {
    return when (this) {
        AttendanceStatus.ATTENDANCE -> stringResource(R.string.attendance_status_attendance)
        AttendanceStatus.TARDINESS -> stringResource(R.string.attendance_status_tardiness)
        AttendanceStatus.ABSENCE -> stringResource(R.string.attendance_status_absence)
    }
}

@Composable
private fun AnnouncementList(
    homeUiState: HomeUiState,
    onAnnouncementBoardClick: () -> Unit,
    onAnnouncementItemClick: (announcementId: Long) -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp),
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable {
                    onAnnouncementBoardClick()
                },
            verticalAlignment = Alignment.CenterVertically,
        ) {
            HomeContentTitle(stringResource(R.string.home_announcement))
            Spacer(modifier = Modifier.padding(4.dp))
            Image(
                painter = painterResource(id = R.drawable.ic_arrow_next),
                contentDescription = stringResource(R.string.home_announcement_description),
            )
        }
        Spacer(modifier = Modifier.padding(8.dp))
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    color = MaterialTheme.colorScheme.surfaceVariant,
                    shape = RoundedCornerShape(10.dp),
                ),
        ) {
            when (homeUiState) {
                is HomeUiState.Success -> {
                    homeUiState.latestAnnouncements.forEach {
                        AnnouncementListItem(
                            title = it.title,
                            content = it.createdAt,
                            onClick = {
                                onAnnouncementItemClick(it.id)
                            },
                        )
                    }
                }

                is HomeUiState.Loading -> {}
            }
        }
    }
}

@Composable
private fun AnnouncementListItem(
    title: String,
    content: String,
    onClick: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 16.dp, horizontal = 20.dp)
            .clickable { onClick() },
    ) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(modifier = Modifier.padding(4.dp))
        Text(
            text = content,
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.onSurface,
        )
    }
}

@Composable
private fun ShortcutList() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = 20.dp),
    ) {
        val shortcutItems = listOf(
            stringResource(R.string.home_shortcut_zzimkkong),
            stringResource(R.string.home_shortcut_prolog),
            stringResource(R.string.home_shortcut_lms),
        )

        HomeContentTitle(stringResource(R.string.home_shortcuts))
        Spacer(modifier = Modifier.padding(8.dp))
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            items(shortcutItems.size) {
                ShortcutListItem(title = shortcutItems[it])
            }
        }
    }
}

@Composable
private fun ShortcutListItem(title: String) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Bottom,
        modifier = Modifier
            .background(
                color = MaterialTheme.colorScheme.surfaceVariant,
                shape = RoundedCornerShape(10.dp),
            )
            .size(104.dp, 112.dp),
    ) {
        Image(
            painter = painterResource(id = R.drawable.ic_home),
            contentDescription = "$title ${stringResource(id = R.string.home_shortcuts_description)}",
        )
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            color = MaterialTheme.colorScheme.onSurface,
            modifier = Modifier.padding(top = 8.dp, bottom = 28.dp),
        )
    }
}

@Composable
private fun HomeContentTitle(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleLarge,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
    )
}

@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun HomeScreenPreview() {
    WoowaCampusTheme {
        HomeScreen(onAnnouncementItemClick = {}, onAnnouncementBoardClick = {})
    }
}
