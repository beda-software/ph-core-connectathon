import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Practitioner } from 'fhir/r4b';

import { SearchBarColumnType } from 'src/components/SearchBar/types';
import { ResourceListPage } from 'src/uberComponents';
import { customAction, navigationAction, questionnaireAction } from 'src/uberComponents/ResourceListPage/actions';
import { renderHumanName } from 'src/utils/fhir';
import { matchCurrentUserRole, Role } from 'src/utils/role';

import { S } from './styles';

export function PractitionerUberList() {
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
        <ResourceListPage<Practitioner>
            headerTitle={t`Practitioners`}
            resourceType="Practitioner"
            searchParams={searchParams}
            getTableColumns={() => [
                {
                    title: <Trans>Name</Trans>,
                    dataIndex: 'name',
                    key: 'name',
                    render: (_text, { resource }) => renderHumanName(resource.name?.[0]),
                    width: 300,
                },

                {
                    title: <Trans>Specialty</Trans>,

                    render: (resource) => {
                        return <div>Diagnostic</div>;
                    },
                    width: 250,
                },
            ]}
            getFilters={() => [
                {
                    id: 'name',
                    searchParam: 'name',
                    type: SearchBarColumnType.STRING,
                    placeholder: t`Find practitioner`,
                    placement: ['search-bar', 'table'],
                },
            ]}
            getRecordActions={(record) => [
                navigationAction('Open', `/practitioners/${record.resource.id}`),
                questionnaireAction('Edit', 'practitioner-edit'),
                customAction(<S.LinkButton type="link">Custom action</S.LinkButton>),
            ]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Add practitioner</Trans>, 'practitioner-create', { icon: <PlusOutlined /> }),
            ]}
            getBatchActions={() => [
                questionnaireAction(<Trans>Delete practitioner</Trans>, 'practitioner-batch-delete'),
            ]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Practitioner`,
                    value: bundle.total,
                },
            ]}
        ></ResourceListPage>
    );
}
