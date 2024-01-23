export interface VentasData {
    data: {
      ventasBrutas: {
        exportacionesFCA: number;
        exportacionesFCA15: number;
        exportacionesFCA18: number;
        exportacionesCA: number;
        exportacionesCA15: number;
        exportacionesCA18: number;
        transferenciaServiciosFyduca15: number;
        transferenciaServiciosFyduca18: number;
        transferenciaBienesFyduca15: number;
        transferenciaBienesFyduca18: number;
        ventasExentasMI18: number;
        ventasExentasMI: number;
        ventasExentasMI15: number;
        ventasExentasExportaciones: number;
        ventasExentasExportacionesFCA: number;
        ventasExentasExportacionesCA: number;
        ventasExoneradasOCE15: number;
        ventasExoneradasOCE18: number;
        ventasExoneradasPN: number;
        ventasNetasMI12: number;
        ventasNetasMI15: number;
        ventasNetasMI18: number;
      };
    };
    isSuccess: boolean;
    message: null | string;
  }
