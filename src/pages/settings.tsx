export default function Settings() {
    return (
        <div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Settings:</h1>
            <div className="flex flex-col justify-center m-auto gap-10">
                <div className="flex flex-row justify-between items-center gap-0 w-96 m-auto h-screen">
                    <button onClick={() => {}}>
                        <SettingIcon setting="AND" text="Set search to AND" />
                    </button>
                    <button onClick={() => {}}>
                        <SettingIcon setting="OR" text="Set search to OR" />
                    </button>
                    <button onClick={() => {}}>
                        <SettingIcon setting="NOT" text="Set search to NOT" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export const SettingIcon = ({ setting, text = 'tooltip 💡' } : { setting: string, text: string}) => {
    return (
        <div className="sidebar-icon group">
            {setting}

            <span className="setting-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )
};