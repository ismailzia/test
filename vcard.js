// Builds a vCard 3.0 contact file — the format phones open with "Add contact".
// Shared by the QR generator (index.html) and the contact page (card/index.html).
(function (global) {
  "use strict";

  // vCard text values must escape backslash, comma, semicolon and newlines.
  function esc(s) {
    return String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
  }

  // Lines longer than 75 octets are folded (continued on the next line after a space).
  function fold(line) {
    if (line.length <= 75) return line;
    var out = line.slice(0, 75);
    for (var i = 75; i < line.length; i += 74) out += "\r\n " + line.slice(i, i + 74);
    return out;
  }

  /**
   * c = {
   *   first, last, org, title, phone, whatsapp, email, url, address, note,
   *   links: [{ label, url }],          // extra profiles (Instagram, LinkedIn…)
   *   photo: { type: "JPEG", base64 }   // optional, only for downloaded .vcf files
   * }
   * Empty fields are skipped. Pass { fold: false } as opts to keep lines unfolded
   * (shorter output for QR codes).
   */
  function buildVCard(c, opts) {
    opts = opts || {};
    var first = (c.first || "").trim(), last = (c.last || "").trim();
    var full = [first, last].filter(Boolean).join(" ") || (c.org || "").trim();
    if (!full) return "";

    var L = ["BEGIN:VCARD", "VERSION:3.0"];
    L.push("N:" + esc(last) + ";" + esc(first) + ";;;");
    L.push("FN:" + esc(full));
    if (c.org) L.push("ORG:" + esc(c.org));
    if (c.title) L.push("TITLE:" + esc(c.title));
    if (c.phone) L.push("TEL;TYPE=CELL:" + c.phone.replace(/[^\d+]/g, ""));
    if (c.whatsapp && c.whatsapp.replace(/\D/g, "") !== (c.phone || "").replace(/\D/g, ""))
      L.push("TEL;TYPE=CELL,WhatsApp:" + c.whatsapp.replace(/[^\d+]/g, ""));
    if (c.email) L.push("EMAIL;TYPE=INTERNET:" + c.email.trim());
    if (c.url) L.push("URL:" + c.url.trim());
    (c.links || []).forEach(function (l) {
      if (l && l.url) L.push("URL;TYPE=" + esc(l.label || "Profile").replace(/\s+/g, "") + ":" + l.url.trim());
    });
    if (c.address) L.push("ADR;TYPE=WORK:;;" + esc(c.address) + ";;;;");
    if (c.note) L.push("NOTE:" + esc(c.note));
    if (c.photo && c.photo.base64) L.push("PHOTO;ENCODING=b;TYPE=" + (c.photo.type || "JPEG") + ":" + c.photo.base64);
    L.push("END:VCARD");

    return L.map(function (l) { return opts.fold === false ? l : fold(l); }).join("\r\n");
  }

  global.buildVCard = buildVCard;
})(window);
