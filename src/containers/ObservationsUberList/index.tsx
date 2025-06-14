import { PlusOutlined } from '@ant-design/icons';
import { t, Trans } from '@lingui/macro';
import { Observation } from 'fhir/r4b';

import { questionnaireAction, navigationAction, ResourceListPage } from '@beda.software/emr/components';

export function ObservationsUberList() {
    return (
        <ResourceListPage<Observation>
            headerTitle="Observations"
            resourceType="Observation"
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
                questionnaireAction(<Trans>Create observation</Trans>, 'observation-create-connectathon', {
                    icon: <PlusOutlined />,
                }),
            ]}
            getBatchActions={() => [questionnaireAction(<Trans>Finish observation</Trans>, '')]}
            getReportColumns={(bundle) => [
                {
                    title: t`Number of Observation`,
                    value: bundle.total,
                },
            ]}
        />
    );
}
