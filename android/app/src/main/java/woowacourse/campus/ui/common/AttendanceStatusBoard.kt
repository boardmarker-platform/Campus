package woowacourse.campus.ui.common

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import woowacourse.campus.R
import woowacourse.campus.ui.theme.WoowaCampusTheme

@Composable
internal fun AttendanceStatusBoard(
    nickname: String = "",
    attendanceStatus: String = "",
    attendanceDetail: String = "",
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .height(200.dp)
            .background(
                color = MaterialTheme.colorScheme.surface,
                shape = RoundedCornerShape(bottomStart = 10.dp, bottomEnd = 10.dp),
            ),
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Row(
                modifier = Modifier.align(Alignment.Start),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Image(
                    painter = painterResource(id = R.mipmap.ic_icon_foreground),
                    contentDescription = stringResource(id = R.string.announcement_board_description),
                    modifier = Modifier.size(60.dp),
                    contentScale = ContentScale.FillBounds,
                )
                Text(
                    text = nickname,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.surfaceVariant,
                )
            }
            Text(
                text = attendanceStatus,
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(top = 32.dp, bottom = 8.dp),
            )
            Text(
                text = attendanceDetail,
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.surfaceVariant,
                modifier = Modifier.padding(bottom = 44.dp),
            )
        }
    }
}

@Preview
@Composable
private fun AttendanceStatusBoardPreview() {
    WoowaCampusTheme {
        AttendanceStatusBoard("안녕하세요 레아", "등교 처리 되었습니다.", "( 선릉캠퍼스 | 10:00:58 )")
    }
}
