import styled from 'styled-components';
import { S as original } from '@beda.software/emr/dist/containers/SignIn/SignIn.styles';
export const S = {
    ...original,
    Header: styled.div`
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: center;
     gap: 5px;
    `,
}
