import { Button, Tooltip } from 'antd';

import config from '@beda.software/emr-config';

import { getAuthorizeUrl, OAuthState } from '@beda.software/emr/dist/services/auth';

import { AppFooter } from '@beda.software/emr/dist/components/BaseLayout/Footer/index';
import {S} from './SignIn.styles'


function authorize(state?: OAuthState) {
    window.location.href = getAuthorizeUrl({
        authPath: 'auth/authorize',
        params: new URLSearchParams({ client_id: config.clientId, response_type: 'token' }),
        state,
    });
}

interface SignInProps {
    originPathName?: string;
}

export function SignIn(props: SignInProps) {
    return (
        <S.Container>
            <S.Form>
                <S.Header>
                    <S.Text>Welcome to Beda EMR</S.Text>
                </S.Header>
                <S.Message>
                    <b>On the next page, please, use one of the following credentials</b>
                    <S.CredentialsWrapper>
                        <S.CredentialsBlock>
                            <S.CredentialLabel>Username</S.CredentialLabel>
                            <S.CredentialsList>
                                <div>
                                    <Tooltip title="As an admin, you have full access to settings and data">
                                        <S.CredentialName>admin</S.CredentialName>
                                    </Tooltip>
                                </div>
                            </S.CredentialsList>
                        </S.CredentialsBlock>
                        <S.CredentialsBlock>
                            <S.CredentialLabel>Password</S.CredentialLabel>
                            <S.CredentialsList>
                                <span>
                                    password
                                </span>
                            </S.CredentialsList>
                        </S.CredentialsBlock>
                    </S.CredentialsWrapper>
                </S.Message>
                <Button
                    type="primary"
                    onClick={() => authorize({ nextUrl: props.originPathName })}
                    size="large"
                >
                    Log in
                </Button>
            </S.Form>
            <AppFooter type="light" />
        </S.Container>
    );
}
