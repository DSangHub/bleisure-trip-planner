import { jsPDF } from "jspdf";
import { formatMoney } from "./format";
import { getPlatformLabel } from "./travel-platforms";
import type {
  CostEstimate,
  SolarHotel,
  TripDay,
  TripFormData,
} from "./types";

const PDF_COLORS = {
  ink: [15, 20, 25] as [number, number, number],
  mist: [148, 163, 184] as [number, number, number],
  sky: [56, 189, 248] as [number, number, number],
  business: [245, 158, 11] as [number, number, number],
  leisure: [52, 211, 153] as [number, number, number],
  text: [30, 41, 59] as [number, number, number],
  line: [203, 213, 225] as [number, number, number],
};

export function exportItineraryPdf({
  trip,
  total,
  days,
  hotels,
  costEstimate,
}: {
  trip: TripFormData;
  total: number;
  days: TripDay[];
  hotels: SolarHotel[];
  costEstimate: CostEstimate | null;
}): void {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;
  const bottomLimit = pageHeight - 56;
  let y = 0;

  const setTextColor = (rgb: [number, number, number]) => doc.setTextColor(...rgb);
  const setDrawColor = (rgb: [number, number, number]) => doc.setDrawColor(...rgb);
  const setFillColor = (rgb: [number, number, number]) => doc.setFillColor(...rgb);

  const wrapText = (text: string, width: number, fontSize = 10) => {
    doc.setFontSize(fontSize);
    return doc.splitTextToSize(text, width);
  };

  const drawPageHeader = (isFirstPage: boolean) => {
    const bandHeight = isFirstPage ? 78 : 34;
    setFillColor(PDF_COLORS.ink);
    doc.rect(0, 0, pageWidth, bandHeight, "F");
    setTextColor([255, 255, 255]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(isFirstPage ? 22 : 12);
    doc.text("Bleisure Trip Planner", margin, isFirstPage ? 34 : 21);
    if (isFirstPage) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      setTextColor(PDF_COLORS.mist);
      doc.text("Business + Leisure travel plan", margin, 52);
      doc.text(
        new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        pageWidth - margin,
        52,
        { align: "right" },
      );
    }
    y = bandHeight + 22;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > bottomLimit) {
      doc.addPage();
      drawPageHeader(false);
    }
  };

  const drawSectionTitle = (title: string) => {
    ensureSpace(34);
    setTextColor(PDF_COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 8;
    setDrawColor(PDF_COLORS.sky);
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + 72, y);
    y += 18;
  };

  const dayAccentColor = (type: TripDay["type"]) => {
    if (type === "business") return PDF_COLORS.business;
    if (type === "leisure") return PDF_COLORS.leisure;
    return PDF_COLORS.mist;
  };

  drawPageHeader(true);

  const boxWidth = (contentWidth - 16) / 3;
  const boxHeight = 46;
  const stats = [
    { label: "Total days", value: String(total), color: PDF_COLORS.sky },
    { label: "Business", value: String(trip.businessDays), color: PDF_COLORS.business },
    { label: "Leisure", value: String(trip.leisureDays), color: PDF_COLORS.leisure },
  ];
  stats.forEach((stat, index) => {
    const x = margin + index * (boxWidth + 8);
    setFillColor([248, 250, 252]);
    setDrawColor(PDF_COLORS.line);
    doc.setLineWidth(0.75);
    doc.roundedRect(x, y, boxWidth, boxHeight, 6, 6, "FD");
    setTextColor(stat.color);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(stat.value, x + 12, y + 24);
    setTextColor(PDF_COLORS.mist);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(stat.label, x + 12, y + 38);
  });
  y += boxHeight + 18;

  drawSectionTitle("Trip summary");
  setFillColor([248, 250, 252]);
  setDrawColor(PDF_COLORS.line);
  doc.roundedRect(margin, y, contentWidth, 82, 8, 8, "FD");
  const leftX = margin + 14;
  const baseY = y + 22;
  [
    ["Traveler", trip.traveler || "Guest"],
    ["Destination", trip.destination],
    ["Dates", `${trip.startDate} to ${trip.endDate}`],
  ].forEach(([label, value], index) => {
    const lineY = baseY + index * 18;
    setTextColor(PDF_COLORS.mist);
    doc.setFontSize(9);
    doc.text(label, leftX, lineY);
    setTextColor(PDF_COLORS.text);
    doc.setFont("helvetica", index === 1 ? "bold" : "normal");
    doc.setFontSize(10);
    doc.text(value, leftX + 62, lineY);
  });
  y += 96;

  drawSectionTitle("Day-by-day itinerary");
  days.forEach((day) => {
    const activityLines = day.activities.flatMap((activity) =>
      wrapText(`- ${activity || "Open time"}`, contentWidth - 36, 10),
    );
    const blockHeight = 30 + activityLines.length * 13;
    ensureSpace(blockHeight + 8);
    const blockTop = y;
    setFillColor([255, 255, 255]);
    setDrawColor(PDF_COLORS.line);
    doc.roundedRect(margin, blockTop, contentWidth, blockHeight, 6, 6, "FD");
    setFillColor(dayAccentColor(day.type));
    doc.rect(margin, blockTop, 4, blockHeight, "F");
    setTextColor(PDF_COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(day.label, margin + 14, blockTop + 18);
    setTextColor(dayAccentColor(day.type));
    doc.setFontSize(8);
    doc.text(
      day.type === "open" ? "FLEXIBLE" : day.type.toUpperCase(),
      pageWidth - margin - 14,
      blockTop + 18,
      { align: "right" },
    );
    setTextColor(PDF_COLORS.mist);
    doc.setFont("helvetica", "normal");
    doc.text(day.date, margin + 14, blockTop + 30);
    setTextColor(PDF_COLORS.text);
    doc.setFontSize(10);
    doc.text(activityLines, margin + 14, blockTop + 46);
    y = blockTop + blockHeight + 10;
  });

  drawSectionTitle("Solar-powered hotel suggestions");
  hotels.forEach((hotel) => {
    const detailLines = wrapText(hotel.highlight, contentWidth - 28, 9);
    const blockHeight = 54 + detailLines.length * 11;
    ensureSpace(blockHeight + 8);
    const blockTop = y;
    setFillColor([255, 251, 235]);
    setDrawColor([251, 191, 36]);
    doc.roundedRect(margin, blockTop, contentWidth, blockHeight, 6, 6, "FD");
    setTextColor(PDF_COLORS.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(hotel.name, margin + 12, blockTop + 18);
    setTextColor([146, 64, 14]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      `${formatMoney(hotel.nightlyRate)}/night   |   ${hotel.solarCoverage}% solar   |   ${hotel.rating.toFixed(1)} / 5   |   ${getPlatformLabel(hotel.platform)}`,
      margin + 12,
      blockTop + 32,
    );
    setTextColor(PDF_COLORS.text);
    doc.text(detailLines, margin + 12, blockTop + 46);
    y = blockTop + blockHeight + 10;
  });

  if (costEstimate) {
    drawSectionTitle("Travel cost estimate");
    const rows = [
      ["Flights", formatMoney(costEstimate.flight)],
      ["Lodging (conventional)", formatMoney(costEstimate.lodgingConventional)],
      ["Lodging (solar stay)", formatMoney(costEstimate.lodgingSolar)],
      ["Meals & activities", formatMoney(costEstimate.meals)],
      ["Local transport", formatMoney(costEstimate.transport)],
      ["Solar energy credit", `-${formatMoney(costEstimate.energyCredit)}`],
    ];
    const rowHeight = 20;
    const tableHeight = rowHeight * (rows.length + 3) + 12;
    ensureSpace(tableHeight + 8);
    const tableTop = y;
    setFillColor([255, 255, 255]);
    setDrawColor(PDF_COLORS.line);
    doc.roundedRect(margin, tableTop, contentWidth, tableHeight, 8, 8, "FD");
    let rowY = tableTop + 24;
    rows.forEach(([label, value]) => {
      setTextColor(PDF_COLORS.mist);
      doc.setFontSize(9);
      doc.text(label, margin + 14, rowY);
      setTextColor(PDF_COLORS.text);
      doc.text(value, pageWidth - margin - 14, rowY, { align: "right" });
      rowY += rowHeight;
    });
    setDrawColor(PDF_COLORS.line);
    doc.line(margin + 12, rowY - 6, pageWidth - margin - 12, rowY - 6);
    const totals: Array<[string, string, [number, number, number]]> = [
      ["Conventional total", formatMoney(costEstimate.conventionalTotal), PDF_COLORS.text],
      ["Solar stay total", formatMoney(costEstimate.solarTotal), [180, 83, 9]],
      ["Estimated savings", formatMoney(costEstimate.savings), [5, 150, 105]],
    ];

    totals.forEach(([label, value, color]) => {
      setTextColor(PDF_COLORS.mist);
      doc.setFont("helvetica", "bold");
      doc.text(String(label), margin + 14, rowY);
      setTextColor(color);
      doc.text(String(value), pageWidth - margin - 14, rowY, { align: "right" });
      rowY += rowHeight;
    });
    y = tableTop + tableHeight + 10;
    ensureSpace(18);
    setTextColor(PDF_COLORS.mist);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      `Estimated carbon avoided: ${costEstimate.carbonAvoidedKg} kg CO2 by choosing solar-powered stays.`,
      margin,
      y,
    );
  }

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    setDrawColor(PDF_COLORS.line);
    doc.line(margin, pageHeight - 36, pageWidth - margin, pageHeight - 36);
    setTextColor(PDF_COLORS.mist);
    doc.setFontSize(8);
    doc.text("Bleisure Trip Planner", margin, pageHeight - 20);
    doc.text(`Page ${page} of ${totalPages}`, pageWidth - margin, pageHeight - 20, {
      align: "right",
    });
  }

  const safeDestination = trip.destination.replace(/[^\w.-]+/g, "_");
  doc.save(`bleisure-trip-${safeDestination}.pdf`);
}
