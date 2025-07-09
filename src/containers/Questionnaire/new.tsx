import { S } from '@beda.software/emr/dist/containers/AidboxFormsBuilder/styles';
import { useParams } from 'react-router-dom';

export function NewQuestionnaire() {
    const { id } = useParams();
    /* const [id, setId] = useState<string|undefined>(); */
    return (
        <S.Container>
            <S.Content>
                <aidbox-form-builder
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
