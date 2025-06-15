import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Organization } from 'fhir/r4b';

import { questionnaireAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';
import { formatHumanDateTime } from '@beda.software/emr/utils';

export function OrganizationsUberList() {
    return (
        <ResourceListPage<Organization>
            headerTitle={t`Organizations`}
            resourceType="Organization"
            getTableColumns={() => [
                {
                    title: <Trans>Name</Trans>,
                    dataIndex: 'name',
                    key: 'name',
                    render: (_text, { resource }) => {
                        return resource.name;
                    },
                    width: 300,
                },
                {
                    title: <Trans>Date</Trans>,
                    dataIndex: 'date',
                    key: 'date',
                    render: (_text, { resource }) => {
                        return formatHumanDateTime(resource.meta?.lastUpdated);
                    },
                    width: 300,
                },
            ]}
            getFilters={() => [
                {
                    id: 'name',
                    searchParam: 'name',
                    type: SearchBarColumnType.STRING,
                    placeholder: t`Find organization`,
                    placement: ['search-bar', 'table'],
                },
            ]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Add organization</Trans>, 'organization-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Organization`,
                    value: bundle.total,
                },
            ]}
        ></ResourceListPage>
    );
}
