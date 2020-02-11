package cpuwarning

import lib.process.Shell
import java.util.Date
import java.io.File

fun main() {
	// 腾讯企业邮箱认账账号
	val sender = MailSender("cpuwarning@githmb.com", "githmb6B")
	// 邮件接收者
	val sendto = listOf("develon@qq.com")

	val sh = Shell()
	sh.ready()

	var logDir = File("./logs") // 日志目录, 记录场景
	if (!logDir.exists()) logDir.mkdirs()
	if (!logDir.isDirectory()) logDir = File(".") // 如果无法创建目录logs, 那么不如把日志写到当前目录下

	if (!sh.isAlive()) return println("启动shell失败")
	
	try {
		println("发送邮件 -- (${ Date() })")
		// 记录触发场景
		sh.run("echo '发送时间：' $(date) >> ${ logDir.getAbsolutePath() }/watcher.\$(date +%Y-%m-%d).log")
		//sender.sendWarning(sendto, "CPU超负荷警告", "服务器CPU严重超载($avg%), 请管理员立即处理.\n$output\nFROM CPUWarning.")
		sendto.forEach {
			println("发送至${ it }")
			sender.sendWarning(it, "Hello", "Hello, li san")
		}
	} catch(e: Throwable) {
		e.printStackTrace()
	}
}
