import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Procedure } from 'fhir/r4b';

import { SearchBarColumnType } from 'src/components/SearchBar/types';
import { ResourceListPage } from 'src/uberComponents';
import { navigationAction, questionnaireAction } from 'src/uberComponents/ResourceListPage/actions';
import { matchCurrentUserRole, Role } from 'src/utils/role';

export function ProceduresUberList() {
    const searchParams = matchCurrentUserRole({
        [Role.Admin]: () => {
            return {
                _count: 33,
            };
        },
        [Role.Practitioner]: () => {
            return {};
        },
        [Role.Receptionist]: () => {
            return {};
        },
        [Role.Patient]: () => {
            return {};
        },
    });
    return (
        <ResourceListPage<Procedure>
            headerTitle="Procedures"
            searchParams={searchParams}
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
                // {
                //     title: 'Date',
                //     dataIndex: 'date',
                //     key: 'date',
                //     width: 250,
                //     render: (_text: any, { resource }) => formatPeriodDateTime(resource.period),
                // },
            ]}
            getFilters={() => [
                {
                    id: 'patients',
                    type: SearchBarColumnType.STRING,
                    placeholder: t`Find procedure`,
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
                questionnaireAction(<Trans>Create procedure</Trans>, 'procedure-create', { icon: <PlusOutlined /> }),
            ]}
            getBatchActions={() => [questionnaireAction(<Trans>Finish procedures</Trans>, '')]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Procedures`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
