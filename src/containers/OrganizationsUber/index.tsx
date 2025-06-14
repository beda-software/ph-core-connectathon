import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Organization } from 'fhir/r4b';

import { SearchBarColumnType } from 'src/components/SearchBar/types';
import { ResourceListPage } from 'src/uberComponents';
import { customAction, navigationAction, questionnaireAction } from 'src/uberComponents/ResourceListPage/actions';
import { matchCurrentUserRole, Role } from 'src/utils/role';

import { S } from './styles';

export function OrganizationsUberList() {
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
        <ResourceListPage<Organization>
            headerTitle={t`Organizations`}
            resourceType="Organization"
            searchParams={searchParams}
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
                questionnaireAction(<Trans>Add organization</Trans>, 'organization-create', { icon: <PlusOutlined /> }),
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
