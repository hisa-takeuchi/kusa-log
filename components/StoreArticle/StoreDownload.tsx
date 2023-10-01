import styled from 'styled-components'
import { IosShare } from '@mui/icons-material'

const Wrapper = styled.section`
  position: relative;
  margin: auto;
  padding: 24px 0;
  width: 88%;
  font-size: 12px;
  overflow: hidden;

  .ttl {
    font-size: 18px;
    font-weight: bold;
  }

  ol {
    margin-top: 16px;
    padding-left: 20px;
    color: rgb(96, 96, 96);

    li {
      position: relative;

      &:before {
        position: absolute;
        top: 0;
        left: -20px;
        content: attr(data-icon);
      }

      strong {
        &:before {
          content: '「';
        }

        &:after {
          content: '」';
        }
      }
    }
  }
`

export function StoreDownload() {
  return (
    <Wrapper className="store-download">
      <h2 className="ttl">ダウンロード方法</h2>
      <ol>
        <li data-icon="1️⃣">
          Safariの <IosShare /> を押してメニューを表示します
        </li>
        <li data-icon="2️⃣">
          <strong>ホーム画面に追加</strong>でホーム画面に追加します
        </li>
        <li data-icon="3️⃣">ホーム画面から起動するとアプリのように振舞います</li>
      </ol>
    </Wrapper>
  )
}
