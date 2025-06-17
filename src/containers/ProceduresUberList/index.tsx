import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Procedure } from 'fhir/r4b';

import { questionnaireAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';

export function ProceduresUberList() {
    return (
        <ResourceListPage<Procedure>
            headerTitle="Procedures"
            resourceType="Procedure"
            getTableColumns={() => [
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (_text: any, { resource }) => {
                        return resource.status;
                    },
                },
                {
                    title: 'Code',
                    key: 'code',
                    render: (_text: any, { resource }) => {
                        return resource.code?.text ?? resource.code?.coding?.[0]?.display;
                    },
                },
                {
                    title: 'Patient',
                    key: 'patient',
                    render: (_text: any, { resource }) => {
                        return resource.subject.display ?? resource.subject.reference;
                    },
                },
            ]}
            getFilters={() => [
                {
                    id: 'status',
                    searchParam: 'status',
                    type: SearchBarColumnType.CHOICE,
                    placeholder: t`Choose status`,
                    options: [
                        {
                            value: {
                                Coding: {
                                    code: 'in-progress',
                                    display: 'In progress',
                                },
                            },
                        },
                        {
                            value: {
                                Coding: {
                                    code: 'finished',
                                    display: 'Finished',
                                },
                            },
                        },
                    ],
                    placement: ['table', 'search-bar'],
                },
                {
                    id: 'patient',
                    searchParam: 'patient:Patient.name',
                    type: SearchBarColumnType.STRING,
                    placeholder: 'Find by patient',
                    placement: ['search-bar', 'table'],
                },
                {
                    id: 'encounter',
                    searchParam: 'encounter',
                    type: SearchBarColumnType.REFERENCE,
                    placeholder: 'Find by encounter',
                    expression: 'Encounter',
                    path: `class.display +' - '+
period.start.toString().split('.')[0].split('T')[0] + ' ' +
period.start.toString().split('.')[0].split('T')[1]`,
                    placement: ['search-bar', 'table'],
                },
            ]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Create procedure</Trans>, 'procedure-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Procedures`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
