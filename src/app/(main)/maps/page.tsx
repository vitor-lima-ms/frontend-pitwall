"use client";
/* Enum imports */
import { PluralPagesNamesEnum } from "@/enums/ui/plural-pages-names.enum";
/* Other libraries imports */
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { Flex, Select, Typography } from "antd";
import { useRequest, useTitle } from "ahooks";
import { useSession } from "next-auth/react";
/* React imports */
import { useState } from "react";
/* API imports */
import getSamplingPoints from "@/app/(main)/sampling-points/_api/sp/get-sps";
/* Response imports */
import GenericSuccessResponse from "@/responses/generic-success.response";
import FindSamplingPointData from "@/responses/sampling-points/find-sp-data.response";
/* Maps */
const Maps: React.FC = () => {
  /**
   * Definindo o título.
   */
  useTitle(PluralPagesNamesEnum.MAP);
  /**
   *
   */

  /**
   * Typography.
   */
  const { Text } = Typography;
  /**
   *
   */

  /**
   * useSession.
   */
  const { data: session } = useSession();
  /**
   *
   */

  /**
   * Variáveis de estado.
   */
  const [selectedSps, setSelectedSps] = useState<FindSamplingPointData[]>([]);

  const [sps, setSps] = useState<FindSamplingPointData[]>([]);
  /**
   *
   */

  /**
   * Buscando os Pontos de coleta.
   */
  const { loading } = useRequest(
    () => getSamplingPoints(session?.accessToken),
    {
      onSuccess: (data) => {
        if (data.success) {
          const successData =
            data as GenericSuccessResponse<FindSamplingPointData>;
          setSps(successData.data);
        }
      },
      ready: !!session?.accessToken,
      refreshDeps: [session?.accessToken],
    },
  );
  /**
   *
   */

  return (
    <Flex vertical gap="middle" style={{ width: "100%" }}>
      <Select
        allowClear
        loading={loading}
        mode="multiple"
        onChange={(value) => {
          const selectedIds = value as string[];

          const selectedSps: FindSamplingPointData[] = [];

          selectedIds.forEach((id) => {
            sps.forEach((sp) => {
              if (id === sp.spId) {
                selectedSps.push(sp);
              }
            });
          });

          setSelectedSps(selectedSps);
        }}
        options={sps.map((value) => {
          return {
            label: value.spName,
            value: value.spId,
          };
        })}
        placeholder={`Selecione os ${PluralPagesNamesEnum.SAMPLING_POINT.toLowerCase()}`}
        showSearch={{ optionFilterProp: "label" }}
        style={{ width: "100%" }}
      />

      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={{ lat: -23.55052, lng: -46.633308 }}
          defaultZoom={2}
          mapId="DEMO_MAP_ID"
          style={{ height: "calc(100vh - 150px)", width: "100%" }}
        >
          {selectedSps.map((sp) => (
            <AdvancedMarker
              key={sp.spId}
              position={{ lat: sp.spCoordY, lng: sp.spCoordX }}
            >
              <Pin>
                <div
                  style={{
                    backgroundColor: "black",
                    borderRadius: "2.5px",
                    fontSize: "12px",
                    padding: "2px",
                    transform: "translateY(-30px)",
                    width: "max-content",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {sp.spName}
                  </Text>
                </div>
              </Pin>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </Flex>
  );
};

export default Maps;
