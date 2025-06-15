import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Procedure } from 'fhir/r4b';

import { questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';

export function ProceduresUberList() {
    return (
        <ResourceListPage<Procedure>
            headerTitle="Procedures"
            resourceType="Procedure"
            getTableColumns={() => [
                {
                    title: 'Patients',

                    render: (_text: any, { resource }) => {
                        return resource.subject.display;
                    },
                },
                {
                    title: 'Procedure',

                    render: (_text: any, { resource }) => {
                        return resource.code?.coding?.[0]?.display;
                    },
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (_text: any, { resource }) => {
                        return resource.status;
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
