import { S } from '@beda.software/emr/dist/containers/AidboxFormsBuilder/styles';
import { axiosInstance, saveFHIRResource } from '@beda.software/emr/services';
import { Questionnaire } from 'fhir/r4b';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isSuccess } from '@beda.software/remote-data';
import config from '@beda.software/emr-config';

const profile = "https://emr-core.beda.software/StructureDefinition/fhir-emr-questionnaire";

export function NewQuestionnaire() {
    const params = useParams();
    const [id, setId] = useState<string | undefined>(params.id);
    const builder = useRef<any>(null);
    useEffect(() => {
        if (builder.current) {
            builder.current.addEventListener('save', async (event: any) => {
                const q: Questionnaire = event.detail;
                if (typeof q.meta === 'undefined') {
                    q.meta = {}
                }
                q.meta.profile = [profile];
                q.subjectType = [
                    "Patient"
                ];
                const response = await saveFHIRResource<Questionnaire>(q);
                if (isSuccess(response)) {
                    setId(response.data.id)
                }
            });
            const authorization = axiosInstance.defaults.headers.Authorization;
            builder.current.onFetch = async (url: string, init: RequestInit) => {
                init.headers = {
                    ...init.headers,
                    ...(authorization ? { Authorization: authorization.toString() } : {}),
                };
                return fetch(config.baseURL + url, init);
            };
        }
    }, [builder])

    return (
        <S.Container>
            <S.Content>
                {/* @ts-ignore */}
                <aidbox-form-builder
                    ref={builder}
                    form-id={id}
                    style={{
                        height: '100%',
                        width: '100%',
                        border: 'none',
                        alignSelf: 'stretch',
                        display: 'flex',
                    }}
                    hideBack="true"
                />
            </S.Content>
        </S.Container>
    )
}
