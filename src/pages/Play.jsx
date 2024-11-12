import React from 'react';
import './Play.css';

function Play() {
    return (
        <main className="play-page">
            <div className="money-display">$1,456,983</div>
            <div className="items-container">
                <div className="item-column">
                    <div className="column-header">
                        <h2>Rags</h2>
                        <p className="subtext">$1,000 per tick</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/old_rag.jpeg?height=80&width=80" alt="Old Rag"/>
                        <h3>Old Rag</h3>
                        <p>Earn $0.30 every tick</p>
                        <p className="price">$1</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/basic_rag.jpeg?height=80&width=80" alt="Basic Rag"/>
                        <h3>Basic Rag</h3>
                        <p>Earn $1 every tick</p>
                        <p className="price">$15</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/high_quality_rag.jpeg?height=80&width=80" alt="High Quality Rag"/>
                        <h3>High Quality Rag</h3>
                        <p>Earn $5 every tick</p>
                        <p className="price">$50</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/super_rag.jpeg?height=80&width=80" alt="Super Rag"/>
                        <h3>Super Rag</h3>
                        <p>Earn $100 every tick</p>
                        <p className="price">$5000</p>
                        <p className="owned">You have: 0</p>
                    </div>
                </div>
                <div className="item-column">
                    <div className="column-header">
                        <h2>Soaps</h2>
                        <p className="subtext">1.5x money multiplier</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/watery_soap.jpeg?height=80&width=80" alt="Watery Soap"/>
                        <h3>Watery Soap</h3>
                        <p>Increase earning multiplier by 0.1%</p>
                        <p className="price">$5</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/basic_soap.jpeg?height=80&width=80" alt="Basic Soap"/>
                        <h3>Basic Soap</h3>
                        <p>Increase earning multiplier by 1%</p>
                        <p className="price">$50</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/high_quality_soap.jpeg?height=80&width=80" alt="High Quality Soap"/>
                        <h3>High Quality Soap</h3>
                        <p>Increase earning multiplier by 5%</p>
                        <p className="price">$115</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/super_soap.jpeg?height=80&width=80" alt="Super Soap"/>
                        <h3>Super Soap</h3>
                        <p>Increase earning multiplier by 100%</p>
                        <p className="price">$250,000</p>
                        <p className="owned">You have: 0</p>
                    </div>
                </div>
                <div className="item-column">
                    <div className="column-header">
                        <h2>Workers</h2>
                        <p className="subtext">5 ticks per second</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/lazy_worker.jpeg?height=80&width=80" alt="Lazy Worker"/>
                        <h3>Lazy Worker</h3>
                        <p>Increase ticks/second by 0.2</p>
                        <p className="price">$100</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/basic_worker.jpeg?height=80&width=80" alt="Basic Worker"/>
                        <h3>Basic Worker</h3>
                        <p>Increase ticks/second by 1</p>
                        <p className="price">$500</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/hard_worker.jpeg?height=80&width=80" alt="Hard Worker"/>
                        <h3>Hard Worker</h3>
                        <p>Increase ticks/second by 50</p>
                        <p className="price">$100,000</p>
                        <p className="owned">You have: 0</p>
                    </div>
                    <div className="item-card">
                        <img src="/assets/super_worker.jpeg?height=80&width=80" alt="Super Worker"/>
                        <h3>Super Worker</h3>
                        <p>Increase ticks/second by 1000</p>
                        <p className="price">$350,000,000</p>
                        <p className="owned">You have: 0</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Play;