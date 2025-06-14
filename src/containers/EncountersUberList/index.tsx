import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Encounter } from 'fhir/r4b';

import { questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';
import { formatPeriodDateTime } from '@beda.software/emr/utils';

export function EncountersUberList() {
    return (
        <ResourceListPage<Encounter>
            headerTitle="Encounters"
            resourceType="Encounter"
            getTableColumns={() => [
                {
                    title: 'Practitioner',
                    dataIndex: 'practitioner',
                    key: 'practitioner',
                    render: (_text: any, { resource }) => resource.participant?.[0]?.individual?.display,
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (_text: any, { resource }) => {
                        return resource.status;
                    },
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                    key: 'date',
                    width: 250,
                    render: (_text: any, { resource }) => formatPeriodDateTime(resource.period),
                },
            ]}
            getFilters={() => [
                {
                    id: 'name',
                    searchParam: '_ilike',
                    type: SearchBarColumnType.STRING,
                    placeholder: t`Find encounter`,
                    placement: ['search-bar', 'table'],
                },
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
            getRecordActions={(record) => [navigationAction('Open', `/`)]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Create encounter</Trans>, 'encounter-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getBatchActions={() => [questionnaireAction(<Trans>Finish encounters</Trans>, '')]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Encounters`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
