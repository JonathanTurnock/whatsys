import humanizeDuration from "npm:humanize-duration@3.32.1"
import chalk from "npm:chalk@5.3.0";
import bytes from "npm:bytes@3.1.2";
import si from "npm:systeminformation@5.22.11";

const report: Array<{title: string, content: string}> = []

async function getRelease() {
    const {distro, release, codename, arch} = await si.osInfo()
    return `${distro} ${release} (${codename}) ${arch}`
}

async function getMemory() {
  const {active, total} = await si.mem()
  return `${bytes(active)} / ${bytes(total)} (${Math.round(100 * active / total)}%)`
}

async function getUpTime() {
  const {uptime} = await si.time()
  return humanizeDuration(uptime * 1000)
}

async function getHost() {
    const {virtual} = await si.system()
  const {manufacturer, model, version, type} = await si.chassis()
  return `${manufacturer} ${model} ${virtual ? "Virtual Machine" : version} (${type})`
}

report.push({title: "OS", content: await getRelease()})

report.push({title: "Host", content: await getHost()})

report.push({title: "OS Uptime", content: await getUpTime()})

report.push({title: "System Memory", content: await getMemory()})

for (const {title, content} of report) {
  console.log(`${chalk.red(title)}: ${content}`)
}