import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Organization } from 'fhir/r4b';

import { customAction, questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';

import { S } from './styles';

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
            getRecordActions={(record) => [
                navigationAction('Open', `/organizations/${record.resource.id}`),
                questionnaireAction('Edit', 'organization-edit'),
                customAction(<S.LinkButton type="link">Custom action</S.LinkButton>),
            ]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Add organization</Trans>, 'organization-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getBatchActions={() => [
                questionnaireAction(<Trans>Delete organization</Trans>, 'organization-batch-delete'),
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
