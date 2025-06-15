import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Medication } from 'fhir/r4b';

import { questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';

export function MedicationsUberList() {
    return (
        <ResourceListPage<Medication>
            headerTitle="Medications"
            resourceType="Medication"
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
            getHeaderActions={() => [
                questionnaireAction(<Trans>Create medication</Trans>, 'medication-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Medication`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
