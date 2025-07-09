import { S } from '@beda.software/emr/dist/containers/AidboxFormsBuilder/styles';

export function NewQuestionnaire() {
    /* const [id, setId] = useState<string|undefined>(); */
    return (
        <S.Container>
            <S.Content>
                <aidbox-form-builder
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
