import { extractCritical } from 'emotion-server';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document<{
  ids: ReturnType<typeof extractCritical>['ids'];
  css: ReturnType<typeof extractCritical>['css'];
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getInitialProps({ renderPage }: DocumentContext): any {
    const page = renderPage() as RenderPageResult;
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }
  render(): JSX.Element {
    const { ids, css } = this.props;
    return (
      <Html>
        <Head>
          <style
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
