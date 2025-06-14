import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Immunization } from 'fhir/r4b';

import { questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';

export function ImmunizationsUberList() {
    return (
        <ResourceListPage<Immunization>
            headerTitle="Immunizations"
            resourceType="Immunization"
            getTableColumns={() => [
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
                                    code: 'completed ',
                                    display: 'Completed',
                                },
                            },
                        },
                        {
                            value: {
                                Coding: {
                                    code: ' entered-in-error ',
                                    display: 'Entered-in-error ',
                                },
                            },
                        },
                        {
                            value: {
                                Coding: {
                                    code: ' not-done ',
                                    display: 'Not-done',
                                },
                            },
                        },
                    ],
                    placement: ['table', 'search-bar'],
                },
            ]}
            getRecordActions={(record) => [navigationAction('Open', `/`)]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Create immunization</Trans>, 'immunization-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getBatchActions={() => [questionnaireAction(<Trans>Finish immunization</Trans>, '')]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Iimmunizations`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
