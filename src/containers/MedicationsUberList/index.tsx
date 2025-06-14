import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Medication } from 'fhir/r4b';

import { questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';

export function MedicationsUberList() {
    return (
        <ResourceListPage<Medication>
            headerTitle="Observations"
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
            getRecordActions={(record) => [navigationAction('Open', `/`)]}
            getHeaderActions={() => [
                questionnaireAction(<Trans>Create medication</Trans>, 'medication-create', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getBatchActions={() => [questionnaireAction(<Trans>Finish Medication</Trans>, '')]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Medication`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
