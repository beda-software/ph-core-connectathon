import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Practitioner } from 'fhir/r4b';

import { customAction, questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';
import { SearchBarColumnType } from '@beda.software/emr/dist/components/SearchBar/types';
import { renderHumanName } from '@beda.software/emr/utils';

import { S } from './styles';

export function PractitionersUberList() {
    return (
        <ResourceListPage<Practitioner>
            headerTitle={t`Practitioners`}
            resourceType="Practitioner"
            getTableColumns={() => [
                {
                    title: <Trans>Name</Trans>,
                    dataIndex: 'name',
                    key: 'name',
                    render: (_text, { resource }) => renderHumanName(resource.name?.[0]),
                    width: 300,
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
